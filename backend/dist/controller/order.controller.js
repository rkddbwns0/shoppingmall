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
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
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
};
exports.OrderController = OrderController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '제품 주문 라우터(경로에 :cart 부분의 yes일 경우 장바구니 구매 코드, no일 경우 일반 구매)',
    }),
    (0, common_1.Post)('/insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.InsertOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "insertOrder", null);
__decorate([
    (0, common_1.Post)('/cart_order'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CartOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cartOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map