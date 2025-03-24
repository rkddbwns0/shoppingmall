"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QnAModoule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const qna_controller_1 = require("../controller/qna.controller");
const product_entity_1 = require("../entites/product.entity");
const qna_entity_1 = require("../entites/qna.entity");
const user_entity_1 = require("../entites/user.entity");
const qna_service_1 = require("../services/qna.service");
const user_token_entity_1 = require("../entites/user_token.entity");
let QnAModoule = class QnAModoule {
};
exports.QnAModoule = QnAModoule;
exports.QnAModoule = QnAModoule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, product_entity_1.ProductEntity, qna_entity_1.QnAEntity, user_token_entity_1.UserTokenEntity])],
        controllers: [qna_controller_1.QnAController],
        providers: [qna_service_1.QnAService],
    })
], QnAModoule);
//# sourceMappingURL=qna.module.js.map