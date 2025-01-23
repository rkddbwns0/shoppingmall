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
exports.OrderItemsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const product_entity_1 = require("../entites/product.entity");
class OrderItemsDto {
}
exports.OrderItemsDto = OrderItemsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '유저 고유 넘버', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemsDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 번호', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemsDto.prototype, "order_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 번호', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", product_entity_1.ProductEntity)
], OrderItemsDto.prototype, "product_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 수량', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemsDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 1개당 가격', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemsDto.prototype, "unit_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 제품 총 가격', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemsDto.prototype, "total_price", void 0);
//# sourceMappingURL=orderItems.dto.js.map