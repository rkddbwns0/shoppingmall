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
exports.QnAController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const qna_dto_1 = require("../dto/qna.dto");
const qna_service_1 = require("../services/qna.service");
const jwt_service_guard_1 = require("../auth/jwt/jwt-service.guard");
let QnAController = class QnAController {
    constructor(qnaService) {
        this.qnaService = qnaService;
    }
    async insertQnA(insertQnADto, res) {
        try {
            const result = await this.qnaService.insertQnA(insertQnADto);
            if (result.success === true) {
                res.status(200).json({ message: 'Q&A 작성이 완료되었습니다.' });
            }
            else {
                res.status(403).json({ message: result.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async selectQnA(product_no, res) {
        try {
            console.log(product_no);
            const result = await this.qnaService.selectAllQnATitle(product_no);
            res.status(200).json({ data: result.data });
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.QnAController = QnAController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 Q&A 작성 라운터' }),
    (0, common_1.Post)('/insert_qna'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qna_dto_1.InsertQnADto, Object]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "insertQnA", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Q&A 목록 라우터 (없을 경우에는 null)' }),
    (0, common_1.Get)('/select_qna/:product_no'),
    __param(0, (0, common_1.Query)('product_no')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "selectQnA", null);
exports.QnAController = QnAController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('QnA'),
    __metadata("design:paramtypes", [qna_service_1.QnAService])
], QnAController);
//# sourceMappingURL=qna.controller.js.map