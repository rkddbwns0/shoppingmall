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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const product_categories_entity_1 = require("./product_categories.entity");
const order_entity_1 = require("./order.entity");
const review_entity_1 = require("./review.entity");
const qna_entity_1 = require("./qna.entity");
const helpful_review_entity_1 = require("./helpful_review.entity");
const like_product_entity_1 = require("./like_product.entity");
const product_option_entity_1 = require("./product_option.entity");
let ProductEntity = class ProductEntity {
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_categories_entity_1.ProductCateogryEntity, (cateogry) => cateogry.category_id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_category' }),
    __metadata("design:type", product_categories_entity_1.ProductCateogryEntity)
], ProductEntity.prototype, "product_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "product_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "product_content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['남성', '여성', '남녀공용'], nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "reg_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: true,
        default: null,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.product_no),
    __metadata("design:type", Array)
], ProductEntity.prototype, "product_option", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => order_entity_1.OrderEntity, (order) => order.product_no),
    (0, typeorm_1.JoinColumn)({ name: 'order_no' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.product_no),
    __metadata("design:type", review_entity_1.ReviewEntity)
], ProductEntity.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qna_entity_1.QnAEntity, (qna) => qna.product_no),
    __metadata("design:type", Array)
], ProductEntity.prototype, "qna", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_product_entity_1.Like_ProductEntity, (like_product) => like_product.product_no),
    __metadata("design:type", like_product_entity_1.Like_ProductEntity)
], ProductEntity.prototype, "like_product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => helpful_review_entity_1.Helpful_ReviewEntity, (helpful_review) => helpful_review.product_no),
    __metadata("design:type", helpful_review_entity_1.Helpful_ReviewEntity)
], ProductEntity.prototype, "helpful_review", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)('product')
], ProductEntity);
//# sourceMappingURL=product.entity.js.map