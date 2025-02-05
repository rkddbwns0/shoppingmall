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
exports.QnA_AnswerEntity = void 0;
const typeorm_1 = require("typeorm");
const qna_entity_1 = require("./qna.entity");
const admin_entity_1 = require("./admin.entity");
let QnA_AnswerEntity = class QnA_AnswerEntity {
};
exports.QnA_AnswerEntity = QnA_AnswerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QnA_AnswerEntity.prototype, "qna_answer_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.AdminEntity, (admin) => admin.admin_id),
    (0, typeorm_1.JoinColumn)({ name: 'admin_no' }),
    __metadata("design:type", Number)
], QnA_AnswerEntity.prototype, "admin_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qna_entity_1.QnAEntity, (qna) => qna.qna_no, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'qna_no' }),
    __metadata("design:type", Number)
], QnA_AnswerEntity.prototype, "qna_no", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 1000,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
    }),
    __metadata("design:type", String)
], QnA_AnswerEntity.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QnA_AnswerEntity.prototype, "write_at", void 0);
exports.QnA_AnswerEntity = QnA_AnswerEntity = __decorate([
    (0, typeorm_1.Entity)('qna_answer')
], QnA_AnswerEntity);
//# sourceMappingURL=qna_answer.entity.js.map