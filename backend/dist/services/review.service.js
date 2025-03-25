"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../entites/order.entity");
const orderItem_entity_1 = require("../entites/orderItem.entity");
const product_entity_1 = require("../entites/product.entity");
const review_entity_1 = require("../entites/review.entity");
const user_entity_1 = require("../entites/user.entity");
const typeorm_2 = require("typeorm");
let ReviewService = class ReviewService {
    constructor(userRepository, productRepository, orderRepository, orderItemRepository, reviewRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.reviewRepository = reviewRepository;
    }
    async selectReview(product_no) {
        try {
            const product_reviews = await this.reviewRepository
                .createQueryBuilder('review')
                .leftJoin((qb) => qb
                .select('helpful_review.review_no', 'review_no')
                .addSelect('COUNT(helpful_review.review_no)', 'helpful_count')
                .from('helpful_review', 'helpful_review')
                .groupBy('helpful_review.review_no'), 'helpful_count', 'review.review_no = helpful_count.review_no')
                .where('review.product_no = :product_no', { product_no })
                .select([
                'review.*',
                'IFNULL(helpful_count.helpful_count, 0) as helpful_count',
            ])
                .orderBy('review.write_at', 'DESC')
                .getRawMany();
            if (!product_reviews) {
                return null;
            }
            return product_reviews;
        }
        catch (error) {
            console.error(error);
        }
    }
    async checkOrder(user_id) {
        try {
            const checkOrderState = await this.orderRepository.find({
                where: { user_id: user_id, order_state: '배송 완료' },
            });
            if (checkOrderState.length === 0) {
                throw new common_1.BadRequestException('리뷰 작성이 가능한 제품이 없습니다.');
            }
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async insertReview(insertReviewDto) {
        try {
            const result = await this.findItemReview(insertReviewDto.order_no, insertReviewDto.option_id, insertReviewDto.user_id);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
    async findItemReview(order_no, option_id, user_id) {
        try {
            const findItem = await this.orderItemRepository
                .createQueryBuilder('orderItems')
                .leftJoin('orderItems.order_no', 'order')
                .leftJoin('orderItems.option_id', 'product_option')
                .select([
                'orderItems.orderItem_no AS orderItem_no',
                'orderItems.review_status AS review_status',
                'order.order_no AS order_no',
                'product_option.option_id AS option_id'
            ])
                .where('orderItems.user_id = :user_id', { user_id: user_id })
                .andWhere('orderItems.order_no = :order_no', { order_no: order_no })
                .andWhere('orderItems.option_id = :option_id', { option_id: option_id })
                .getRawOne();
            console.log(findItem.review_status);
            if (!findItem) {
                throw new common_1.BadRequestException('구매 내역에 존재하지 않는 제품입니다.');
            }
            if (findItem.review_status === 'O') {
                throw new common_1.BadRequestException('이미 리뷰를 작성한 제품입니다.');
            }
            return { check: true, result: findItem };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItemEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map