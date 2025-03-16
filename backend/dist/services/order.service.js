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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const address_entity_1 = require("../entites/address.entity");
const admin_entity_1 = require("../entites/admin.entity");
const cart_entity_1 = require("../entites/cart.entity");
const order_entity_1 = require("../entites/order.entity");
const orderItem_entity_1 = require("../entites/orderItem.entity");
const product_entity_1 = require("../entites/product.entity");
const product_option_entity_1 = require("../entites/product_option.entity");
const user_entity_1 = require("../entites/user.entity");
const typeorm_2 = require("typeorm");
let OrderService = class OrderService {
    constructor(orderRepository, userRepository, cartRepository, productRepository, product_optionRespository, addressRepository, orderItemsRepository, adminRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.product_optionRespository = product_optionRespository;
        this.addressRepository = addressRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.adminRepository = adminRepository;
    }
    async orderList(user_id) {
        try {
            const order = await this.orderRepository.find({
                where: { user_id: user_id },
                order: { order_at: 'DESC' },
            });
            return order;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async insertOrder(insertOrderDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { user_id: insertOrderDto.user_id },
            });
            const address = await this.addressRepository.findOne({
                where: { user_id: user.user_id, default_addr: 'Y' },
            });
            const product = await this.productRepository.findOne({ where: { product_id: insertOrderDto.product_no }, select: ['price'] });
            const product_option = await this.product_optionRespository.findOne({
                where: { option_id: insertOrderDto.option_id, product_no: insertOrderDto.product_no },
            });
            if (!user || !address || !product_option) {
                throw new common_1.BadRequestException('정보가 존재하지 않습니다. 다시 확인해 주세요.');
            }
            if (product_option.stock < insertOrderDto.quantity) {
                throw new common_1.BadRequestException('재고가 부족합니다. 다시 확인해 주세요.');
            }
            product_option.stock = product_option.stock - insertOrderDto.quantity;
            await this.product_optionRespository.update(product_option, {
                stock: product_option.stock,
            });
            insertOrderDto.address_no = address.address_no;
            insertOrderDto.total_price = product.price * insertOrderDto.quantity;
            const orderData = {
                ...insertOrderDto,
                product_no: [product],
            };
            const result = await this.orderRepository.create(orderData);
            const saveResult = await this.orderRepository.save(result);
            const orderItems = {
                user_id: user.user_id,
                order_no: saveResult.order_no,
                product_no: product,
                quantity: insertOrderDto.quantity,
                unit_price: product.price,
                total_price: insertOrderDto.total_price,
            };
            const saveItems = await this.orderItemsRepository.create(orderItems);
            await this.orderItemsRepository.save(saveItems);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async cartOrder(cartOrderDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { user_id: cartOrderDto.user_id },
            });
            const address = await this.addressRepository.findOne({
                where: { user_id: user.user_id, default_addr: 'Y' },
            });
            const cart_product = await this.cartRepository.find({
                where: { user_id: user.user_id },
                relations: ['product_id'],
            });
            const product_nos = cart_product.map((cartItem) => cartItem.product_id.product_id);
            const product_data = await this.productRepository.find({
                where: { product_id: (0, typeorm_2.In)(product_nos) },
            });
            if (!user || !cart_product || !product_data) {
                throw new common_1.BadRequestException('정보가 없습니다.');
            }
            let total_price = 0;
            let total_quantity = 0;
            const product_items = [];
            cart_product.forEach((cartItem) => {
                const product = product_data.find((product) => product.product_id === cartItem.product_id.product_id);
                if (product) {
                    total_price += product.price * cartItem.quantity;
                    total_quantity += cartItem.quantity;
                    product_items.push({
                        product_no: product.product_id,
                        unit_price: product.price * cartItem.quantity,
                        quantity: cartItem.quantity,
                    });
                }
            });
            cartOrderDto.address_no = address.address_no;
            const cartOrder_data = {
                ...cartOrderDto,
                product_no: product_data,
                quantity: total_quantity,
                total_price: total_price,
            };
            const result = await this.orderRepository.create(cartOrder_data);
            const saveResult = await this.orderRepository.save(result);
            const orderItems = product_items.map((item) => ({
                ...item,
                user_id: user.user_id,
                order_no: saveResult.order_no,
                total_price: total_price,
            }));
            console.log(orderItems);
            const saveItems = await this.orderItemsRepository.create(orderItems);
            await this.orderItemsRepository.save(saveItems);
            await this.cartRepository.delete({ user_id: user.user_id });
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async refundOrder(refundOrderDto) {
        try {
            await this.checkOrderState(refundOrderDto.order_no);
            const findOrderItems = await this.orderItemsRepository.find({
                where: {
                    order_no: refundOrderDto.order_no,
                },
                relations: ['product_no'],
            });
            refundOrderDto.order_state = '환불 진행 중';
            const result = await this.orderRepository.save(refundOrderDto);
            Promise.all(findOrderItems.map(async (item) => {
                const product = item.product_no;
                const order_quantity = item.quantity;
                await this.productRepository.save(product);
            }));
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
    async checkOrderState(order_no) {
        try {
            const orderState = await this.orderRepository.findOne({
                where: { order_no: order_no },
                select: ['order_state'],
            });
            if (orderState.order_state === '환불 진행 중' ||
                orderState.order_state === '환불 완료') {
                throw new common_1.BadRequestException('이미 환불 처리된 주문입니다.');
            }
            else {
                return;
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(product_option_entity_1.Product_optionEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(address_entity_1.AddressEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItemEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map