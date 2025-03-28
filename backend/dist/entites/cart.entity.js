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
exports.CartEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const product_option_entity_1 = require("./product_option.entity");
let CartEntity = class CartEntity {
};
exports.CartEntity = CartEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartEntity.prototype, "cart_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], CartEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.option_id),
    (0, typeorm_1.JoinColumn)({ name: 'option_id' }),
    __metadata("design:type", product_option_entity_1.Product_optionEntity)
], CartEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1, nullable: false }),
    __metadata("design:type", Number)
], CartEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CartEntity.prototype, "create_at", void 0);
exports.CartEntity = CartEntity = __decorate([
    (0, typeorm_1.Entity)('cart')
], CartEntity);
//# sourceMappingURL=cart.entity.js.map