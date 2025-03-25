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
exports.JwtServiceAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_token_entity_1 = require("../../entites/user_token.entity");
const typeorm_2 = require("typeorm");
const express_1 = require("express");
let JwtServiceAuthGuard = class JwtServiceAuthGuard {
    constructor(reflector, jwtService, configService, user_token) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
        this.user_token = user_token;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const accessToken = request.cookies['shop_access_token'];
        const refreshToken = request.cookies['shop_refresh_token'];
        const device_id = request.headers['device-id'];
        const requestUserId = request.body.user_id || request.params.user_id;
        if (!accessToken) {
            throw new common_1.UnauthorizedException();
        }
        await this.checkRefreshToken(requestUserId, device_id, refreshToken);
        const access_payload = await this.checkAccessToken(accessToken);
        if (Number(requestUserId) !== access_payload.user_id) {
            throw new common_1.UnauthorizedException('아이디 넘버가 일치하지 않습니다.');
        }
        request.user = access_payload;
        const storeToken = await this.user_token.findOne({
            where: {
                user_id: request.user.user_id,
                device_id: device_id,
                token: refreshToken,
            },
        });
        if (!storeToken) {
            throw new common_1.UnauthorizedException("refresh_token이 존재하지 않습니다.");
        }
        else {
            try {
                const payloadRefreshToken = await this.jwtService.verifyAsync(refreshToken, { secret: this.configService.get('JWT_SECRET_KEY') });
                const newAccessToken = this.jwtService.sign({
                    user_id: payloadRefreshToken.user_id,
                    email: payloadRefreshToken.email,
                    name: payloadRefreshToken.name,
                }, {
                    secret: this.configService.get('JWT_SECRET_KEY'),
                    expiresIn: '1h',
                });
                response.cookie('shop_access_token', newAccessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                });
                request.user = payloadRefreshToken;
                return true;
            }
            catch (error) {
                await this.user_token.delete({
                    user_id: request?.user.user_id,
                    device_id: device_id,
                });
                response.clearCookie('shop_access_token');
                response.clearCookie('shop_refresh_token');
                throw new common_1.UnauthorizedException('토큰이 만료되었습니다. 다시 로그인해 주세요.');
            }
        }
    }
    async checkRefreshToken(user_id, device_id, refreshToken) {
        try {
            const payloadRefreshToken = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            return true;
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('만료된 refreshToken입니다.');
                await this.user_token.delete({ user_id: user_id, device_id: device_id, token: refreshToken });
                express_1.response.clearCookie('shop_access_token');
                express_1.response.clearCookie('shop_refresh_token');
                throw new common_1.UnauthorizedException('토큰이 만료되었습니다. 다시 로그인해 주세요.');
            }
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async checkAccessToken(accessToken) {
        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            return payload;
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.JwtServiceAuthGuard = JwtServiceAuthGuard;
exports.JwtServiceAuthGuard = JwtServiceAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_token_entity_1.UserTokenEntity)),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository])
], JwtServiceAuthGuard);
//# sourceMappingURL=jwt-service.guard.js.map