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
exports.UpdateCartDto = exports.DeleteCartDto = exports.InsertCartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class InsertCartDto {
}
exports.InsertCartDto = InsertCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 아이디 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertCartDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 넘버값',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertCartDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수량',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertCartDto.prototype, "quantity", void 0);
class DeleteCartDto {
}
exports.DeleteCartDto = DeleteCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '장바구니 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteCartDto.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 아이디 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteCartDto.prototype, "user_id", void 0);
class UpdateCartDto {
}
exports.UpdateCartDto = UpdateCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '장바구니 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCartDto.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수량',
        required: true,
    }),
    __metadata("design:type", Number)
], UpdateCartDto.prototype, "quantity", void 0);
//# sourceMappingURL=cart.dto.js.map