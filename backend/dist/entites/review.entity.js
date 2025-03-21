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
exports.ReviewEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const user_entity_1 = require("./user.entity");
const helpful_review_entity_1 = require("./helpful_review.entity");
const product_option_entity_1 = require("./product_option.entity");
let ReviewEntity = class ReviewEntity {
};
exports.ReviewEntity = ReviewEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "review_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.option_id),
    (0, typeorm_1.JoinColumn)({ name: 'option_id' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        length: 1000,
    }),
    __metadata("design:type", String)
], ReviewEntity.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: false }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ReviewEntity.prototype, "write_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => helpful_review_entity_1.Helpful_ReviewEntity, (helpful_review) => helpful_review.review_no),
    __metadata("design:type", Array)
], ReviewEntity.prototype, "helpful_review", void 0);
exports.ReviewEntity = ReviewEntity = __decorate([
    (0, typeorm_1.Entity)('review')
], ReviewEntity);
//# sourceMappingURL=review.entity.js.map