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
exports.DeleteAddressDto = exports.UpdateAddressDto = exports.InsertAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class InsertAddressDto {
}
exports.InsertAddressDto = InsertAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 아이디 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertAddressDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주문자 이름',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '우편번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "zip_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '배송지 주소',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '배송지 상세 주소',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "detail_addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '요청 시 주문 사항',
        default: '조심히 안전하게 배송해주세요.',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "req", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기본 배송지 지정 여부',
        default: ['Y', 'N'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "default_addr", void 0);
class UpdateAddressDto {
}
exports.UpdateAddressDto = UpdateAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 배송지 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAddressDto.prototype, "address_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 아이디 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAddressDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기본 배송지 설정 여부 (Y -> N으로 변경하거나 혹은 그 반대)',
        enum: ['Y', 'N'],
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "default_addr", void 0);
class DeleteAddressDto {
}
exports.DeleteAddressDto = DeleteAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기본 배송지 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteAddressDto.prototype, "address_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteAddressDto.prototype, "user_id", void 0);
//# sourceMappingURL=address.dto.js.map