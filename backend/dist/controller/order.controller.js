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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_dto_1 = require("../dto/order.dto");
const order_service_1 = require("../services/order.service");
const jwt_service_guard_1 = require("../auth/jwt/jwt-service.guard");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async orderList(user_id, res) {
        try {
            const result = await this.orderService.orderList(user_id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: '에러' });
        }
    }
    async orderDetail(user_id, cart_id, res) {
        try {
            const result = await this.orderService.orderDetail(user_id, cart_id);
            res.status(200).json({ data: result });
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertOrder(insertOrderDto, res) {
        try {
            if (!insertOrderDto) {
                return res
                    .status(400)
                    .json({ message: 'insertOrderDto 데이터가 필요합니다' });
            }
            const result = await this.orderService.insertOrder(insertOrderDto);
            if (result.success === true) {
                return res.status(200).json({ message: '구매가 완료되었습니다.' });
            }
            else {
                return res.status(403).json({ message: '구매에 실패하였습니다.' });
            }
        }
        catch (error) {
            console.error(error);
            return res
                .status(403)
                .json({ message: '구매에 실패하였습니다.', error: error });
        }
    }
    async cartOrder(cartOrderDto, res) {
        try {
            const result = await this.orderService.cartOrder(cartOrderDto);
            if (result.success === true) {
                return res
                    .status(200)
                    .json({ message: '장바구니 제품들이 구매되었습니다.' });
            }
            else {
                return res
                    .status(403)
                    .json({ message: '장바구니 제품 구매에 실패하였습니다.' });
            }
        }
        catch (error) {
            console.error(error);
            return res
                .status(403)
                .json({ message: '구매에 실패하였습니다.', error: error });
        }
    }
    async refundOrder(refundOrderDto, res) {
        try {
            const result = await this.orderService.refundOrder(refundOrderDto);
            if (result.success === true) {
                res
                    .status(200)
                    .json({ message: '환불 요청이 정상적으로 완료되었습니다.' });
            }
            else {
                res.status(403).json({ message: result.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 내역 확인 라우터' }),
    (0, common_1.Get)('/select/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 상세 내역' }),
    (0, common_1.Get)('/detail/select/:user_id/:cart_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('cart_id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '제품 주문 라우터',
    }),
    (0, common_1.Post)('/insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.InsertOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "insertOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '장바구니 제품 구매 라우터',
    }),
    (0, common_1.Post)('/cart_order'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CartOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cartOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고객 환불 요청 라우터' }),
    (0, common_1.Put)('/refund'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.RefundOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "refundOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map