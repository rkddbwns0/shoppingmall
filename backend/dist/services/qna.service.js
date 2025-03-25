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
exports.QnAService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../entites/product.entity");
const qna_entity_1 = require("../entites/qna.entity");
const user_entity_1 = require("../entites/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let QnAService = class QnAService {
    constructor(userRepository, productRepository, qnaRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.qnaRepository = qnaRepository;
    }
    async insertQnA(insertQnADto) {
        try {
            if (insertQnADto.private === 'O' && !insertQnADto.private_pwd) {
                throw new common_1.BadRequestException('비밀글을 작성하기 위해서는 비밀번호를 등록해야 합니다.');
            }
            if (insertQnADto.private === 'O') {
                const hashPassword = await this.hashPrivatePwd(insertQnADto.private_pwd);
                insertQnADto.private_pwd = hashPassword;
            }
            const writeQnA = this.qnaRepository.create(insertQnADto);
            await this.qnaRepository.save(writeQnA);
            return { success: true };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async hashPrivatePwd(private_pwd) {
        try {
            const hashPwd = await bcrypt.hash(private_pwd, 10);
            return hashPwd;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async selectAllQnATitle(product_no) {
        try {
            const allQna = await this.qnaRepository
                .createQueryBuilder('qna')
                .leftJoinAndSelect('qna.product_no', 'product')
                .leftJoinAndSelect('qna.option_id', 'product_option')
                .select([
                'qna.title AS title',
                'qna.content AS content',
                'qna.private AS private',
                'qna.answer_yn AS answer_yn',
                'product.product_id AS product_id',
                'product.product_name AS product_name',
                'product_option.option_id AS option_id',
                'product_option.color AS color',
                'product_option.size AS size'
            ])
                .where('qna.product_no = :product_no', { product_no })
                .getRawMany();
            const qnaData = allQna.map((item) => ({
                ...item,
                title: item.private === 'O' ? (item.title = '비밀글 입니다.') : item.title,
                answer_yn: item.answer_yn === true ? '답변 완료' : '답변 대기 중',
            }));
            if (!qnaData) {
                return null;
            }
            return { data: qnaData };
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.QnAService = QnAService;
exports.QnAService = QnAService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(qna_entity_1.QnAEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QnAService);
//# sourceMappingURL=qna.service.js.map