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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_service_guard_1 = require("../auth/jwt/jwt-service.guard");
const auth_dto_1 = require("../dto/auth.dto");
const user_dto_1 = require("../dto/user.dto");
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async duplicateUser(body, res) {
        try {
            const result = await this.userService.checkDuplicate(body?.email, body?.phone, body?.nickname);
            res.status(200).json(result);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async signup(signupUserDto, res) {
        try {
            const hashPassword = await this.userService.hashPassword(signupUserDto.password);
            signupUserDto.password = hashPassword;
            const result = await this.userService.signupUser(signupUserDto);
            return res
                .status(result.success ? 201 : 400)
                .json({ message: result.message });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: '서버에러입니다.' });
        }
    }
    async login(req, res, loginDto) {
        try {
            const token = await this.authService.login(loginDto);
            res.cookie('shop_access_token', token.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            res.cookie('shop_refresh_token', token.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            res
                .status(common_1.HttpStatus.OK)
                .json({ message: '로그인 성공', data: token.user_info });
            return;
        }
        catch (error) {
            console.error(error);
        }
    }
    async logout(res) {
        res.clearCookie('shop_access_token');
        res.clearCookie('shop_refresh_token');
        return { message: '로그아웃' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입 중복 검사 라우터' }),
    (0, common_1.Post)('/duplicate_user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "duplicateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입 라우터' }),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.SignUpUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인 라우터' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그아웃 라우터' }),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map