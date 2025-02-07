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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../entites/product.entity");
const product_categories_entity_1 = require("../entites/product_categories.entity");
const typeorm_2 = require("typeorm");
let ProductService = class ProductService {
    constructor(productRepository, productCategoryRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }
    async selectProductCategory(category_id) {
        const categoryResult = await this.productCategoryRepository.find({
            where: { parent_id: { category_id } },
            relations: ['children'],
        });
        if (!categoryResult) {
            throw new common_1.BadRequestException('정보가 없습니다.');
        }
        return categoryResult;
    }
    async selectProduct(product_category) {
        const category = await this.productCategoryRepository
            .createQueryBuilder('product_category')
            .leftJoinAndSelect('product_category.children', 'children_category')
            .where('product_category.parent_id = :parent_id OR product_category.category_id = :parent_id', {
            parent_id: product_category,
        })
            .getMany();
        const categoryResult = category.map((category) => category.category_id);
        const ProductResult = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.product_category', 'category')
            .leftJoin('review', 'review', 'review.product_no = product.product_id')
            .leftJoin('like_product', 'like_product', 'like_product.product_no = product.product_id')
            .where('product.product_category IN (:...categoryResult)', {
            categoryResult,
        })
            .select([
            'product',
            'IFNULL(COUNT(review.product_no), 0) AS review_count',
            'IFNULL(ROUND(AVG(review.scope), 1), 0) AS review_scope',
            'IFNULL(COUNT(like_product.product_no), 0) as liked_count',
        ])
            .groupBy('product.product_id')
            .getRawMany();
        console.log(ProductResult);
        return ProductResult;
    }
    async selectOneProduct(product_id) {
        try {
            const selectProduct = await this.productRepository
                .createQueryBuilder('product')
                .leftJoin((qb) => qb
                .select('review.product_no', 'product_no')
                .addSelect('COUNT(review.product_no) AS review_count')
                .addSelect('review.scope', 'scope')
                .from('review', 'review')
                .groupBy('review.product_no'), 'review', 'review.product_no = product.product_id')
                .leftJoin((qd) => qd
                .select('qna.product_no', 'product_no')
                .addSelect('COUNT(qna.product_no) AS qna_count')
                .from('qna', 'qna')
                .groupBy('qna.product_no'), 'qna', 'qna.product_no = product.product_id')
                .leftJoin((qb) => qb
                .select('like_product.product_no', 'product_no')
                .addSelect('COUNT(like_product.product_no) AS liked_count')
                .from('like_product', 'like_product')
                .groupBy('like_product.product_no'), 'like_product', 'like_product.product_no = product.product_id')
                .where('product.product_id = :product_id', { product_id })
                .select([
                'product',
                'IFNULL(review.review_count, 0) AS review_count',
                'IFNULL(ROUND(AVG(review.scope), 1), 0) AS review_scope',
                'IFNULL(qna.qna_count, 0) AS qna_count',
                'IFNULL(like_product.liked_count, 0) as liked_count',
            ])
                .groupBy('product.product_id')
                .getRawOne();
            return selectProduct;
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertProduct(regProductDto) {
        const product_category = await this.productCategoryRepository.findOne({
            where: { category_id: regProductDto.product_category },
            select: ['category_id'],
        });
        const productData = {
            ...regProductDto,
            product_category,
        };
        console.log(productData);
        try {
            const result = await this.productRepository.create(productData);
            await this.productRepository.save(result);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async updateProduct(updateProductDto) {
        const productId = await this.productRepository.findOne({
            where: { product_id: updateProductDto.product_id },
        });
        if (!productId) {
            throw new common_1.BadRequestException('존재하지 않는 제품 번호입니다.');
        }
        updateProductDto.product_id = productId.product_id;
        try {
            await this.productRepository.update(updateProductDto.product_id, updateProductDto);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_categories_entity_1.ProductCateogryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map