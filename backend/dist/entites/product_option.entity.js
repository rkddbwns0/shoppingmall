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
exports.Product_optionEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const orderItem_entity_1 = require("./orderItem.entity");
const cart_entity_1 = require("./cart.entity");
const review_entity_1 = require("./review.entity");
let Product_optionEntity = class Product_optionEntity {
};
exports.Product_optionEntity = Product_optionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product_optionEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", Number)
], Product_optionEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Product_optionEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['XS(85)', 'S(90)', 'M(95)', 'L(100)', 'XL(105)', 'XXL(110)'],
    }),
    __metadata("design:type", String)
], Product_optionEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Product_optionEntity.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product_optionEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product_optionEntity.prototype, "sale_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product_optionEntity.prototype, "reg_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product_optionEntity.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItemEntity, (orderItem) => orderItem.option_id),
    __metadata("design:type", Array)
], Product_optionEntity.prototype, "orderItem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.CartEntity, (cart) => cart.option_id),
    __metadata("design:type", Array)
], Product_optionEntity.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.option_id),
    __metadata("design:type", review_entity_1.ReviewEntity)
], Product_optionEntity.prototype, "review", void 0);
exports.Product_optionEntity = Product_optionEntity = __decorate([
    (0, typeorm_1.Entity)('product_option')
], Product_optionEntity);
//# sourceMappingURL=product_option.entity.js.map