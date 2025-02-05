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
exports.OrderMngService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../../entites/admin.entity");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../entites/order.entity");
let OrderMngService = class OrderMngService {
    constructor(admin, orderRepository) {
        this.admin = admin;
        this.orderRepository = orderRepository;
    }
    async checkAdmin(admin_id) {
        try {
            const findAdmin = await this.admin.findOne({
                where: { admin_id: admin_id },
            });
            if (!findAdmin) {
                throw new common_1.BadRequestException('존재하지 않는 관리자입니다. 다시 확인해 주세요.');
            }
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async orderMng(orderMngDto) {
        try {
            const findOrderState = await this.orderRepository.findOne({
                where: {
                    order_no: orderMngDto.order_no,
                },
            });
            if (!findOrderState) {
                throw new common_1.BadRequestException('존재하지 않는 주문 번호입니다. 다시 확인해 주세요.');
            }
            if (findOrderState.order_state === '환불 완료') {
                throw new common_1.BadRequestException('이미 환불이 완료된 주문입니다. 다시 확인해 주세요.');
            }
            switch (orderMngDto.order_state) {
                case (orderMngDto.order_state = '배송 중'):
                    if (findOrderState.order_state !== '주문 완료') {
                        throw new common_1.BadRequestException('주문이 완료된 상태에서만 변경이 가능합니다. 다시 확인해 주세요.');
                    }
                    break;
                case (orderMngDto.order_state = '배송 완료'):
                    if (findOrderState.order_state !== '배송 중') {
                        throw new common_1.BadRequestException('배송 중인 상태에서만 변경이 가능합니다. 다시 확인해 주세요.');
                    }
                    break;
                case (orderMngDto.order_state = '환불 완료'):
                    if (findOrderState.order_state !== '환불 진행 중') {
                        throw new common_1.BadRequestException('환불 진행 중인 상태의 주문만 변경이 가능합니다. 다시 확인해 주세요.');
                    }
                    break;
                default:
                    throw new common_1.BadRequestException('유효하지 않은 주문 상태입니다. 다시 확인해 주세요.');
            }
            await this.orderRepository.update(orderMngDto.order_no, {
                order_state: orderMngDto.order_state,
            });
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
};
exports.OrderMngService = OrderMngService;
exports.OrderMngService = OrderMngService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderMngService);
//# sourceMappingURL=order_mng.service.js.map