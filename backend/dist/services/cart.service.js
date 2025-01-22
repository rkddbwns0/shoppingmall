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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("../entites/cart.entity");
const typeorm_2 = require("typeorm");
let CartService = class CartService {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async selectCart(user_id) {
        try {
            const result = await this.cartRepository.find({
                where: { user_id: user_id },
                relations: ['product_id'],
            });
            return { success: true, result: result };
        }
        catch (error) {
            console.error(error);
            return { message: '없어요' };
        }
    }
    async insertCart(insertCartDto) {
        try {
            const findCart = await this.cartRepository.findOne({
                where: insertCartDto,
            });
            if (findCart) {
                const newQuantity = findCart.quantity + insertCartDto.quantity;
                await this.cartRepository.update(findCart.cart_id, {
                    quantity: newQuantity,
                });
                return { success: true };
            }
            else {
                const result = await this.cartRepository.create(insertCartDto);
                await this.cartRepository.save(result);
                return { success: true };
            }
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async DeleteCart(deleteCartDto) {
        try {
            const findCart = await this.cartRepository.findOne({
                where: { cart_id: deleteCartDto.cart_id },
            });
            if (!findCart) {
                throw new common_1.BadRequestException('장바구니에 존재하지 않는 제품입니다.');
            }
            await this.cartRepository.delete(deleteCartDto);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async UdpateCart(updateCartDto) {
        try {
            const findCart = await this.cartRepository.findOne({
                where: { cart_id: updateCartDto.cart_id },
            });
            if (!findCart) {
                throw new common_1.BadRequestException('장바구니에 해당 제품이 없습니다.');
            }
            await this.cartRepository.update(updateCartDto.cart_id, {
                quantity: updateCartDto.quantity,
            });
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map