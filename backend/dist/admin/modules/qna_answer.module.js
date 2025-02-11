"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QnA_AnswerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const qna_answer_entity_1 = require("../../entites/qna_answer.entity");
const qna_answer_service_1 = require("../services/qna_answer.service");
const admin_entity_1 = require("../../entites/admin.entity");
const qna_answer_controller_1 = require("../controller/qna_answer.controller");
const qna_entity_1 = require("../../entites/qna.entity");
let QnA_AnswerModule = class QnA_AnswerModule {
};
exports.QnA_AnswerModule = QnA_AnswerModule;
exports.QnA_AnswerModule = QnA_AnswerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity, qna_answer_entity_1.QnA_AnswerEntity, qna_entity_1.QnAEntity]),
        ],
        controllers: [qna_answer_controller_1.QnA_AdminController],
        providers: [qna_answer_service_1.QnA_AnswerService],
    })
], QnA_AnswerModule);
//# sourceMappingURL=qna_answer.module.js.map