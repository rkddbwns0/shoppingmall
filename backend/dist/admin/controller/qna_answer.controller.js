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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QnA_AdminController = void 0;
const common_1 = require("@nestjs/common");
const qna_answer_service_1 = require("../services/qna_answer.service");
const qna_answer_dto_1 = require("../dto/qna_answer.dto");
const public_decorator_1 = require("../../auth/decorator/public.decorator");
let QnA_AdminController = class QnA_AdminController {
    constructor(qna_answerService) {
        this.qna_answerService = qna_answerService;
    }
    async all_qna(res) {
        try {
            const result = await this.qna_answerService.all_qna();
            res.status(200).json({ data: result });
        }
        catch (error) {
            console.error(error);
        }
    }
    async select_qna(qna_no, res) {
        try {
            const result = await this.qna_answerService.select_qna(qna_no);
            if (result.success === true) {
                res.status(200).json({ data: result.result });
            }
            else {
                res.status(403).json({ message: result.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async qna_answer(qna_answerDto, res) {
        try {
            const check_admin = await this.qna_answerService.checkAdmin(qna_answerDto.admin_no);
            console.log(check_admin);
            if (check_admin.check === true) {
                const result = await this.qna_answerService.admin_qna_answer(qna_answerDto);
                if (result.success === true) {
                    res.status(200).json({ message: '답변이 등록되었습니다!' });
                }
                else {
                    res
                        .status(403)
                        .json({ message: '답변 등록에 실패했습니다. 다시 확인해 주세요.' });
                }
            }
            else {
                res.status(403).json({ message: check_admin.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.QnA_AdminController = QnA_AdminController;
__decorate([
    (0, common_1.Get)('/all_qna'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QnA_AdminController.prototype, "all_qna", null);
__decorate([
    (0, common_1.Get)('/select_qna'),
    __param(0, (0, common_1.Query)('qna_no')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QnA_AdminController.prototype, "select_qna", null);
__decorate([
    (0, common_1.Post)('/qna_answer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qna_answer_dto_1.QnA_AnswerDto, Object]),
    __metadata("design:returntype", Promise)
], QnA_AdminController.prototype, "qna_answer", null);
exports.QnA_AdminController = QnA_AdminController = __decorate([
    (0, common_1.Controller)('admin/qna'),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [qna_answer_service_1.QnA_AnswerService])
], QnA_AdminController);
//# sourceMappingURL=qna_answer.controller.js.map