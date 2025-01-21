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
exports.UpdateProductDto = exports.RegProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const product_enum_1 = require("../components/product_enum");
class RegProductDto {
}
exports.RegProductDto = RegProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 카테고리 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegProductDto.prototype, "product_category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '~~반팔',
        description: '제품 이름',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegProductDto.prototype, "product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '여름에 입기 좋은 얇은 반팔입니다.',
        description: '제품 설명',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegProductDto.prototype, "product_content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '[남성, 여성, 남녀공용]',
        description: '성별',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(product_enum_1.Gender),
    __metadata("design:type", String)
], RegProductDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 사이즈',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegProductDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 색상',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegProductDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '50,000',
        description: '제품 가격',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '50,000 -> 39,900',
        description: '제품 세일 가격',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegProductDto.prototype, "sale_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '10개',
        description: '제품 수량',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegProductDto.prototype, "stock", void 0);
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 설명',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "product_content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 가격',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '세일 가격', required: false }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "sale_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 수량', required: false }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock", void 0);
//# sourceMappingURL=product.dto.js.map