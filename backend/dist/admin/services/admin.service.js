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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../../entites/admin.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const order_entity_1 = require("../../entites/order.entity");
let AdminService = class AdminService {
    constructor(admin, orderRepository) {
        this.admin = admin;
        this.orderRepository = orderRepository;
    }
    async duplicateEmail(email) {
        let admin = await this.admin.findOne({
            where: { email: email },
        });
        if (admin) {
            throw new common_1.BadRequestException('이미 가입된 계정입니다.');
        }
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 11);
    }
    async createAdmin(createAdminDto) {
        try {
            const createAdmin = await this.admin.create(createAdminDto);
            await this.admin.save(createAdmin);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async adminLogin(adminLogin) {
        try {
            let admin = await this.admin.findOne({
                where: {
                    email: adminLogin.email,
                },
            });
            if (!admin) {
                throw new common_1.BadRequestException('존재하지 않은 관리자 정보입니다.');
            }
            const comparePassword = await bcrypt.compare(adminLogin.password, admin.password);
            if (!comparePassword) {
                throw new common_1.BadRequestException('비밀번호가 일치하지 않습니다.');
            }
            return { login_success: true };
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map