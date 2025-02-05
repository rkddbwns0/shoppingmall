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
exports.QnA_AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../../entites/admin.entity");
const qna_entity_1 = require("../../entites/qna.entity");
const qna_answer_entity_1 = require("../../entites/qna_answer.entity");
const typeorm_2 = require("typeorm");
let QnA_AnswerService = class QnA_AnswerService {
    constructor(admin, qna_answer, qna) {
        this.admin = admin;
        this.qna_answer = qna_answer;
        this.qna = qna;
    }
    async all_qna() {
        try {
            const qna_list = await this.qna.find({ relations: ['product_no'] });
            console.log(qna_list);
            const qna_answer_yn = qna_list.map((item) => ({
                ...item,
                answer_yn: item.answer_yn === true ? '답변 완료' : '답변 대기 중',
            }));
            return qna_answer_yn;
        }
        catch (error) {
            console.error(error);
        }
    }
    async select_qna(qna_no) {
        try {
            const qna = await this.qna.findOne({ where: { qna_no: qna_no } });
            if (!qna) {
                throw new common_1.BadRequestException('존재하지 않는 게시글입니다. 다시 확인해 주세요.');
            }
            return { success: true, result: qna };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async checkAdmin(admin_no) {
        try {
            const findAdmin = await this.admin.findOne({
                where: { admin_id: admin_no },
            });
            if (!findAdmin) {
                throw new common_1.BadRequestException('존재하지 않는 관리자입니다. 다시 확인해 주세요.');
            }
            if (findAdmin.role !== 'admin') {
                throw new common_1.BadRequestException('답변 권한이 없는 관리자 계정입니다.');
            }
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async admin_qna_answer(qna_answerDto) {
        try {
            const answer = await this.qna_answer.create(qna_answerDto);
            const saveAnswer = await this.qna_answer.save(answer);
            if (saveAnswer) {
                await this.qna.update(qna_answerDto.qna_no, { answer_yn: true });
            }
            return { success: true };
        }
        catch (error) {
            return { success: false };
        }
    }
};
exports.QnA_AnswerService = QnA_AnswerService;
exports.QnA_AnswerService = QnA_AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(qna_answer_entity_1.QnA_AnswerEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(qna_entity_1.QnAEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QnA_AnswerService);
//# sourceMappingURL=qna_answer.service.js.map