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
            const result = await this.orderService.insertOrder(insertOrderDto);
            if (result.success === true) {
                res.status(200).json({ message: '구매가 완료되었습니다.' });
            }
            else {
                res.status(403).json({ message: '구매에 실패하였습니다.' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(403).json({ message: '구매에 실패하였습니다.', error: error });
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '제품 주문 라우터(장바구니 x -> 제품을 바로 구매할 경우',
    }),
    (0, common_1.Post)('/insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.InsertOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "insertOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map