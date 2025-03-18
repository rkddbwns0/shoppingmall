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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entites/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_token_entity_1 = require("../entites/user_token.entity");
let AuthService = class AuthService {
    constructor(user, user_token, jwtService, configService) {
        this.user = user;
        this.user_token = user_token;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(loginDto) {
        const caluateExpriryDate = () => {
            const now = new Date();
            now.setDate(now.getDate() + 7);
            return now;
        };
        const user = await this.vaildateServiceUser(loginDto);
        const accessToken = await this.accessTokenService(user);
        const refreshToken = await this.refreshTokenService(user);
        const user_info = {
            email: user.email,
            name: user.name,
        };
        const findToken = await this.user_token.findOne({
            where: { user_id: user.user_id, token: refreshToken },
        });
        if (!findToken) {
            const newToken = this.user_token.create({
                user_id: user.user_id,
                token: refreshToken,
                device_id: loginDto.device_id,
                expires_at: caluateExpriryDate(),
            });
            await this.user_token.save(newToken);
        }
        return { accessToken, refreshToken, user_info };
    }
    async vaildateServiceUser(loginDto) {
        try {
            const findUser = await this.user.findOne({
                where: { email: loginDto.email },
            });
            if (!findUser) {
                throw new common_1.ForbiddenException('가입되지 않은 유저입니다.');
            }
            if (!(await bcrypt.compare(loginDto.password, findUser.password))) {
                throw new common_1.ForbiddenException('비밀번호가 일치하지 않습니다.');
            }
            return findUser;
        }
        catch (error) {
            console.error(error);
        }
    }
    async accessTokenService(user) {
        const payload = {
            user_id: user.user_id,
            email: user.email,
            name: user.name,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '1h',
        });
        return accessToken;
    }
    async refreshTokenService(user) {
        const payload = {
            user_id: user.user_id,
            email: user.email,
            name: user.name,
        };
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });
        return refreshToken;
    }
    async logout(logoutDto) {
        try {
            const user = await this.user.findOne({
                where: { email: logoutDto.email },
                select: ['user_id'],
            });
            await this.user_token.delete({
                user_id: user.user_id,
                device_id: logoutDto.device_id,
            });
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_token_entity_1.UserTokenEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map