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
exports.OrderMngController = void 0;
const common_1 = require("@nestjs/common");
const order_mng_service_1 = require("../services/order_mng.service");
const swagger_1 = require("@nestjs/swagger");
const order_mng_dto_1 = require("../dto/order_mng.dto");
const public_decorator_1 = require("../../auth/decorator/public.decorator");
let OrderMngController = class OrderMngController {
    constructor(orderMngService) {
        this.orderMngService = orderMngService;
    }
    async successRefund(orderMngDto, res) {
        try {
            const checkAdmin = await this.orderMngService.checkAdmin(orderMngDto.admin_id);
            if (checkAdmin.check === true) {
                const result = await this.orderMngService.orderMng(orderMngDto);
                if (result.success === true) {
                    res.status(200).json({ message: '주문 상태가 변경되었습니다.' });
                }
                else {
                    res.status(403).json({ message: result.message });
                }
            }
            else {
                res.status(403).json({ message: checkAdmin.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.OrderMngController = OrderMngController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '관리자 주문 상태 관리 라우터' }),
    (0, common_1.Put)('/update_order_state'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_mng_dto_1.OrderMngDto, Object]),
    __metadata("design:returntype", Promise)
], OrderMngController.prototype, "successRefund", null);
exports.OrderMngController = OrderMngController = __decorate([
    (0, common_1.Controller)('admin/order_mng'),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [order_mng_service_1.OrderMngService])
], OrderMngController);
//# sourceMappingURL=order_mng.controller.js.map