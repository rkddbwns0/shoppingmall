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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_dto_1 = require("../dto/cart.dto");
const cart_service_1 = require("../services/cart.service");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async selectCart(user_id, res) {
        try {
            const result = await this.cartService.selectCart(user_id);
            if (result.success === true) {
                res.status(200).json({ result });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertCart(insertCartDto, res) {
        try {
            console.log(insertCartDto);
            const result = await this.cartService.insertCart(insertCartDto);
            if (result.success === true) {
                res.status(200).json({ message: '장바구니에 저장되었습니다.' });
            }
            else {
                res.status(403).json({ message: '장바구니 저장이 실패하였습니다.' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async deleteCart(deleteCartDto, res) {
        try {
            const result = await this.cartService.DeleteCart(deleteCartDto);
            if (result.success === true) {
                res
                    .status(200)
                    .json({ message: '제품이 장바구니에서 제거되었습니다.' });
            }
            else {
                res
                    .status(403)
                    .json({ message: '제품을 장바구니에서 제거하지 못했습니다.' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateCart(updateCartDto, res) {
        try {
            const result = await this.cartService.UdpateCart(updateCartDto);
            if (result.success === true) {
                res.status(200).json({ message: '제품 수량 변경 성공' });
            }
            else {
                res.status(403).json({ message: '제품 수량 변경 실패' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.CartController = CartController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '장바구니 내역' }),
    (0, common_1.Get)('select'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "selectCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '장바구니 저장 라우터' }),
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.InsertCartDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "insertCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '장바구니 삭제 라우터' }),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.DeleteCartDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '장바구니 수량 업데이트 라우터' }),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.UpdateCartDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map