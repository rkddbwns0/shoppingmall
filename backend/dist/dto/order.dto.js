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
exports.CartOrderDto = exports.InsertOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class InsertOrderDto {
}
exports.InsertOrderDto = InsertOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 고유 넘버값',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "product_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '구매 제품 수량',
        default: 1,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 주문 현황',
        enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
        default: '주문 완료',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertOrderDto.prototype, "order_state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '환불 사유',
        required: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertOrderDto.prototype, "refund_reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 기본 배송지 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "address_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결제 방식',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertOrderDto.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 총 구매 가격',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "total_price", void 0);
class CartOrderDto {
}
exports.CartOrderDto = CartOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 고유 넘버값',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Array)
], CartOrderDto.prototype, "product_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '구매 제품 수량',
        default: 1,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 주문 현황',
        enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
        default: '주문 완료',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartOrderDto.prototype, "order_state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '환불 사유',
        required: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartOrderDto.prototype, "refund_reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 기본 배송지 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "address_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결제 방식',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartOrderDto.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 총 구매 가격',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "total_price", void 0);
//# sourceMappingURL=order.dto.js.map