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
exports.QnAEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const user_entity_1 = require("./user.entity");
const qna_answer_entity_1 = require("./qna_answer.entity");
const product_option_entity_1 = require("./product_option.entity");
let QnAEntity = class QnAEntity {
};
exports.QnAEntity = QnAEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QnAEntity.prototype, "qna_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", product_entity_1.ProductEntity)
], QnAEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.option_id),
    (0, typeorm_1.JoinColumn)({ name: 'option_id' }),
    __metadata("design:type", product_option_entity_1.Product_optionEntity)
], QnAEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], QnAEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, length: 50 }),
    __metadata("design:type", String)
], QnAEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 1000,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
    }),
    __metadata("design:type", String)
], QnAEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['O', 'X'], default: 'X' }),
    __metadata("design:type", String)
], QnAEntity.prototype, "private", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 20 }),
    __metadata("design:type", String)
], QnAEntity.prototype, "private_pwd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], QnAEntity.prototype, "answer_yn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QnAEntity.prototype, "write_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qna_answer_entity_1.QnA_AnswerEntity, (qna_answer) => qna_answer.qna_no, {
        cascade: true,
    }),
    __metadata("design:type", qna_answer_entity_1.QnA_AnswerEntity)
], QnAEntity.prototype, "qna_answer", void 0);
exports.QnAEntity = QnAEntity = __decorate([
    (0, typeorm_1.Entity)('qna')
], QnAEntity);
//# sourceMappingURL=qna.entity.js.map