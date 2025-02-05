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
exports.QnA_AnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QnA_AnswerDto {
}
exports.QnA_AnswerDto = QnA_AnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리자 고유 번호' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QnA_AnswerDto.prototype, "admin_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '질문 번호' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QnA_AnswerDto.prototype, "qna_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '답변 내용' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], QnA_AnswerDto.prototype, "contents", void 0);
//# sourceMappingURL=qna_answer.dto.js.map