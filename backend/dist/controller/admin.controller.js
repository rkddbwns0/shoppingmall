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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_dto_1 = require("../dto/admin.dto");
const admin_service_1 = require("../admin/services/admin.service");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createAdmin(createAdminDto, res) {
        try {
            await this.adminService.duplicateEmail(createAdminDto.email);
            const hashPassword = await this.adminService.hashPassword(createAdminDto.password);
            createAdminDto.password = hashPassword;
            const result = await this.adminService.createAdmin(createAdminDto);
            if (result.success === true) {
                res.status(200).json({ message: '관리자 계정 생성 완료' });
            }
            else {
                res.status(403).json({ message: '생성 실패' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async adminLogin(adminLoginDto, res) {
        const result = await this.adminService.adminLogin(adminLoginDto);
        if (result.login_success === true) {
            res.status(200).json({ message: '로그인 성공' });
        }
        else {
            res.status(403).json({ message: '로그인 실패' });
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '관리자 생성 경로' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '관리자 로그인 경로' }),
    (0, common_1.Post)('admin_login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminLogin", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map