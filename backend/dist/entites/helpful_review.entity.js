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
exports.Helpful_ReviewEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const product_entity_1 = require("./product.entity");
const review_entity_1 = require("./review.entity");
let Helpful_ReviewEntity = class Helpful_ReviewEntity {
};
exports.Helpful_ReviewEntity = Helpful_ReviewEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Helpful_ReviewEntity.prototype, "no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Helpful_ReviewEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", Number)
], Helpful_ReviewEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => review_entity_1.ReviewEntity, (review) => review.review_no),
    (0, typeorm_1.JoinColumn)({ name: 'review_no' }),
    __metadata("design:type", Number)
], Helpful_ReviewEntity.prototype, "review_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Helpful_ReviewEntity.prototype, "create_at", void 0);
exports.Helpful_ReviewEntity = Helpful_ReviewEntity = __decorate([
    (0, typeorm_1.Entity)('helpful_review')
], Helpful_ReviewEntity);
//# sourceMappingURL=helpful_review.entity.js.map