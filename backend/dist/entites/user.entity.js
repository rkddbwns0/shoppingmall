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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
const address_entity_1 = require("./address.entity");
const orderItem_entity_1 = require("./orderItem.entity");
const order_entity_1 = require("./order.entity");
const review_entity_1 = require("./review.entity");
const qna_entity_1 = require("./qna.entity");
const helpful_review_entity_1 = require("./helpful_review.entity");
const like_product_entity_1 = require("./like_product.entity");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, default: UserEntity.name }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.CartEntity, (cart) => cart.user_id),
    __metadata("design:type", Array)
], UserEntity.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.AddressEntity, (address) => address.user_id),
    __metadata("design:type", Array)
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.user_id),
    __metadata("design:type", Array)
], UserEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItemEntity, (orderItem) => orderItem.user_id),
    __metadata("design:type", Array)
], UserEntity.prototype, "orderItem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.user_id),
    __metadata("design:type", review_entity_1.ReviewEntity)
], UserEntity.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qna_entity_1.QnAEntity, (qna) => qna.user_id),
    __metadata("design:type", qna_entity_1.QnAEntity)
], UserEntity.prototype, "qna", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_product_entity_1.Like_ProductEntity, (like_product) => like_product.user_id),
    __metadata("design:type", like_product_entity_1.Like_ProductEntity)
], UserEntity.prototype, "like_product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => helpful_review_entity_1.Helpful_ReviewEntity, (helpful_review) => helpful_review.user_id),
    __metadata("design:type", helpful_review_entity_1.Helpful_ReviewEntity)
], UserEntity.prototype, "helpful_review", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
//# sourceMappingURL=user.entity.js.map