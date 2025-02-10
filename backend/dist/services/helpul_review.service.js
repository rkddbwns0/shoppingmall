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
exports.Helpful_ReviewServiece = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const helpful_review_entity_1 = require("../entites/helpful_review.entity");
const product_entity_1 = require("../entites/product.entity");
const review_entity_1 = require("../entites/review.entity");
const user_entity_1 = require("../entites/user.entity");
const typeorm_2 = require("typeorm");
let Helpful_ReviewServiece = class Helpful_ReviewServiece {
    constructor(user, product, review, helpful_review) {
        this.user = user;
        this.product = product;
        this.review = review;
        this.helpful_review = helpful_review;
    }
    async checkData(press_helpful_reviewDto) {
        try {
            await this.checkUser(press_helpful_reviewDto.user_id);
            await this.checkProduct(press_helpful_reviewDto.product_no);
            await this.checkReview(press_helpful_reviewDto.review_no);
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async checkUser(user_id) {
        const findUser = await this.user.findOne({ where: { user_id: user_id } });
        if (!findUser) {
            throw new common_1.BadRequestException('존재하지 않는 유저입니다.');
        }
    }
    async checkProduct(product_no) {
        const findProduct = await this.product.findOne({
            where: { product_id: product_no },
        });
        if (!findProduct) {
            throw new common_1.BadRequestException('존재하지 않는 제품입니다.');
        }
    }
    async checkReview(review_no) {
        const findReview = await this.review.findOne({
            where: { review_no: review_no },
        });
        if (!findReview) {
            throw new common_1.BadRequestException('존재하지 않는 리뷰입니다.');
        }
    }
    async press_helpful_review(press_helpful_reviewDto) {
        try {
            const press_yn = await this.helpful_review.findOne({
                where: {
                    review_no: press_helpful_reviewDto.review_no,
                    user_id: press_helpful_reviewDto.user_id,
                    product_no: press_helpful_reviewDto.product_no,
                },
            });
            if (!press_yn) {
                const create_press = await this.helpful_review.create(press_helpful_reviewDto);
                await this.helpful_review.save(create_press);
                return {
                    success: true,
                    message: '도움 되었어요 버튼을 활성화 합니다.',
                };
            }
            await this.helpful_review.remove(press_yn);
            return { success: true, message: '도움 되었어요 버튼을 취소합니다.' };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.Helpful_ReviewServiece = Helpful_ReviewServiece;
exports.Helpful_ReviewServiece = Helpful_ReviewServiece = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(helpful_review_entity_1.Helpful_ReviewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], Helpful_ReviewServiece);
//# sourceMappingURL=helpul_review.service.js.map