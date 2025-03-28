"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_controller_1 = require("../controller/order.controller");
const address_entity_1 = require("../entites/address.entity");
const admin_entity_1 = require("../entites/admin.entity");
const cart_entity_1 = require("../entites/cart.entity");
const order_entity_1 = require("../entites/order.entity");
const orderItem_entity_1 = require("../entites/orderItem.entity");
const product_entity_1 = require("../entites/product.entity");
const product_option_entity_1 = require("../entites/product_option.entity");
const user_entity_1 = require("../entites/user.entity");
const order_service_1 = require("../services/order.service");
const user_token_entity_1 = require("../entites/user_token.entity");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                order_entity_1.OrderEntity,
                address_entity_1.AddressEntity,
                user_entity_1.UserEntity,
                cart_entity_1.CartEntity,
                product_entity_1.ProductEntity,
                orderItem_entity_1.OrderItemEntity,
                admin_entity_1.AdminEntity,
                product_option_entity_1.Product_optionEntity,
                user_token_entity_1.UserTokenEntity
            ]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map