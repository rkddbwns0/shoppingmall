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
    constructor(orderRepository, userRepository, cartRepository, productRepository, product_optionRepository, addressRepository, orderItemsRepository, adminRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.product_optionRepository = product_optionRepository;
        this.addressRepository = addressRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.adminRepository = adminRepository;
    }
    async orderList(user_id) {
        try {
            const order = await this.orderRepository
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.address_no', 'address')
                .leftJoinAndSelect('order.orderItem', 'order_items')
                .leftJoinAndSelect('order_items.option_id', 'product_option')
                .leftJoinAndSelect('product_option.product_no', 'product')
                .select([
                'order.order_no AS order_no',
                'order.quantity AS order_quantity',
                'order.payment_method AS payment_method',
                'order.total_price AS total_price',
                'order.order_state AS order_state',
                'order.order_at AS order_at',
                'order_items.quantity AS items_qauntity',
                'order_items.unit_price AS unit_price',
                'product_option.color AS color',
                'product_option.size AS size',
                'product.product_name AS product_name',
                'product.price AS price',
                'address.name AS name',
                'address.zip_code AS zip_code',
                'address.address AS address',
            ])
                .where('order.user_id = :user_id', { user_id })
                .getRawMany();
            console.log(order);
            return order;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async orderDetail(user_id, cart_id) {
        try {
            const detail_info = await this.cartRepository.findOne({
                where: { user_id: user_id, cart_id: cart_id },
            });
            if (!detail_info) {
                throw new common_1.UnauthorizedException();
            }
            return detail_info;
        }
        catch (error) {
            console.error(error);
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
            const product = await this.productRepository.findOne({
                where: { product_id: insertOrderDto.product_no },
                select: ['price'],
            });
            const product_option = await this.product_optionRepository.findOne({
                where: {
                    option_id: insertOrderDto.option_id,
                    product_no: { product_id: insertOrderDto.product_no },
                },
            });
            if (!user || !address || !product_option) {
                throw new common_1.BadRequestException('정보가 존재하지 않습니다. 다시 확인해 주세요.');
            }
            if (product_option.stock < insertOrderDto.quantity) {
                throw new common_1.BadRequestException('재고가 부족합니다. 다시 확인해 주세요.');
            }
            product_option.stock = product_option.stock - insertOrderDto.quantity;
            await this.product_optionRepository.update(product_option.option_id, {
                stock: product_option.stock,
            });
            insertOrderDto.address_no = address.address_no;
            insertOrderDto.total_price = product.price * insertOrderDto.quantity;
            const orderData = {
                ...insertOrderDto,
                product_no: [product],
            };
            const result = this.orderRepository.create(orderData);
            const saveResult = await this.orderRepository.save(result);
            const orderItems = {
                user_id: user.user_id,
                order_no: { order_no: saveResult.order_no },
                option_id: product_option,
                quantity: insertOrderDto.quantity,
                unit_price: product.price,
                total_price: insertOrderDto.total_price,
            };
            console.log(orderItems);
            const saveItems = this.orderItemsRepository.create(orderItems);
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
            const cart_product = await this.cartRepository
                .createQueryBuilder('cart')
                .leftJoin('product_option', 'product_option', 'product_option.option_id = cart.option_id')
                .leftJoin('product', 'product', 'product.product_id = product_option.product_no')
                .where('cart.user_id = :user_id', { user_id: cartOrderDto.user_id })
                .select(['cart', 'product_option', 'product.price'])
                .groupBy('cart.option_id')
                .getRawMany();
            const product_nos = cart_product.map((cartItem) => cartItem.cart_option_id);
            const product_data = await this.product_optionRepository.find({
                where: { option_id: (0, typeorm_2.In)(product_nos) },
            });
            if (!user || !cart_product || !product_data) {
                throw new common_1.BadRequestException('정보가 없습니다.');
            }
            let total_price = 0;
            let total_quantity = 0;
            const product_items = [];
            cart_product.forEach((cartItem) => {
                const product_option = product_data.find((product_option) => product_option.option_id === cartItem.cart_option_id);
                if (product_option) {
                    total_price += cartItem.product_price * cartItem.cart_quantity;
                    total_quantity += cartItem.cart_quantity;
                    product_items.push({
                        option_id: product_option.option_id,
                        unit_price: cartItem.cart_quantity * cartItem.product_price,
                        quantity: cartItem.cart_quantity,
                    });
                }
                console.log(cartItem);
            });
            cartOrderDto.address_no = address.address_no;
            const cartOrder_data = {
                ...cartOrderDto,
                product_no: product_data,
                quantity: total_quantity,
                total_price: total_price,
            };
            const result = this.orderRepository.create(cartOrder_data);
            const saveResult = await this.orderRepository.save(result);
            const orderItems = product_items.map((item) => ({
                ...item,
                user_id: user.user_id,
                order_no: saveResult.order_no,
                total_price: total_price,
            }));
            console.log(orderItems);
            const saveItems = this.orderItemsRepository.create(orderItems);
            await this.orderItemsRepository.save(saveItems);
            await Promise.all(cart_product.map(async (cartItem) => {
                const product_option = product_data.find((product_option) => product_option.option_id === cartItem.cart_option_id);
                if (product_option) {
                    const updateStock = product_option.stock - cartItem.cart_quantity;
                    if (updateStock < 0) {
                        throw new common_1.BadRequestException('현재 재고가 부족합니다. 다시 확인해 주세요.');
                    }
                    await this.product_optionRepository.update({ option_id: product_option.option_id }, { stock: updateStock });
                }
            }));
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
                    order_no: { order_no: refundOrderDto.order_no },
                },
                relations: ['product_no'],
            });
            refundOrderDto.order_state = '환불 진행 중';
            const result = await this.orderRepository.save(refundOrderDto);
            Promise.all(findOrderItems.map(async (item) => {
                const product = item.option_id;
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