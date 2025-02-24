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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entites/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(user) {
        this.user = user;
    }
    async checkDuplicate(email, phone, nickname) {
        try {
            const result = {};
            if (email) {
                const emailResult = await this.checkEmail(email);
                result.email = emailResult.message || emailResult.ErrorMessage;
            }
            if (phone) {
                const phoneResult = await this.checkPhone(phone);
                result.phone = phoneResult.message || phoneResult.ErrorMessage;
            }
            if (nickname) {
                const nicknameResult = await this.checkNickname(nickname);
                result.nickname = nicknameResult.message || nicknameResult.ErrorMessage;
            }
            return result;
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async checkEmail(email) {
        try {
            const dupEmail = await this.user.findOne({ where: { email: email } });
            if (dupEmail) {
                throw new common_1.BadRequestException('이미 사용 중인 이메일 입니다.');
            }
            return { message: '사용 가능한 이메일입니다.' };
        }
        catch (error) {
            return { ErrorMessage: error.message };
        }
    }
    async checkPhone(phone) {
        try {
            const dupPhone = await this.user.findOne({ where: { phone: phone } });
            if (dupPhone) {
                throw new common_1.BadRequestException('이미 가입된 연락처입니다.');
            }
            return { message: '사용 가능한 연락처입니다.' };
        }
        catch (error) {
            return { ErrorMessage: error.message };
        }
    }
    async checkNickname(nickname) {
        try {
            const dupNickname = await this.user.findOne({
                where: { nickname: nickname },
            });
            if (dupNickname) {
                throw new common_1.BadRequestException('이미 사용 중인 닉네임입니다.');
            }
            return { message: '사용 가능한 닉네임입니다.' };
        }
        catch (error) {
            return { ErrorMessage: error.message };
        }
    }
    async hashPassword(password) {
        console.log(password);
        return await bcrypt.hash(password, 10);
    }
    async signupUser(signupUserDto) {
        try {
            console.log(signupUserDto);
            const checkUser = await this.user.findOne({
                where: { email: signupUserDto.email, phone: signupUserDto.phone },
            });
            if (checkUser) {
                throw new common_1.BadRequestException('이미 가입된 유저입니다.');
            }
            const signup = await this.user.create(signupUserDto);
            const saveSignup = await this.user.save(signup);
            if (!saveSignup) {
                throw new common_1.BadRequestException('회원가입에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.');
            }
            return { suceess: true, message: '회원가입에 성공하였습니다.' };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map