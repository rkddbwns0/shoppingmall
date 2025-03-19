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
exports.InsertQnADto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const product_entity_1 = require("../entites/product.entity");
const product_option_entity_1 = require("../entites/product_option.entity");
class InsertQnADto {
}
exports.InsertQnADto = InsertQnADto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 넘버',
        type: 'number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", product_entity_1.ProductEntity)
], InsertQnADto.prototype, "product_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 상세 넘버',
        type: 'number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", product_option_entity_1.Product_optionEntity)
], InsertQnADto.prototype, "option_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 고유 넘버',
        type: 'number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertQnADto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제목',
        type: 'string',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20, { message: '제목은 5자 이상, 20자 이하로 입력해 주세요.' }),
    (0, class_validator_1.MinLength)(5, { message: '제목은 5자 이상, 20자 이하로 입력해 주세요.' }),
    __metadata("design:type", String)
], InsertQnADto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '질문 내용',
        type: 'string',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], InsertQnADto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비밀글 적용 여부',
        type: 'string',
        enum: ['O', 'X'],
        default: 'X',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertQnADto.prototype, "private", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비밀글 확인 비밀번호',
        type: 'string',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20, {
        message: '비밀번호는 4자 이상, 20자 이하로 숫자, 영문으로 입력해 주세요.',
    }),
    (0, class_validator_1.MinLength)(4, {
        message: '비밀번호는 4자 이상, 20자 이하로 숫자, 영문으로 입력해 주세요.',
    }),
    __metadata("design:type", String)
], InsertQnADto.prototype, "private_pwd", void 0);
//# sourceMappingURL=qna.dto.js.map