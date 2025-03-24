"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_controller_1 = require("../controller/review.controller");
const order_entity_1 = require("../entites/order.entity");
const orderItem_entity_1 = require("../entites/orderItem.entity");
const product_entity_1 = require("../entites/product.entity");
const review_entity_1 = require("../entites/review.entity");
const user_entity_1 = require("../entites/user.entity");
const review_service_1 = require("../services/review.service");
const user_token_entity_1 = require("../entites/user_token.entity");
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                review_entity_1.ReviewEntity,
                product_entity_1.ProductEntity,
                user_entity_1.UserEntity,
                order_entity_1.OrderEntity,
                orderItem_entity_1.OrderItemEntity,
                user_token_entity_1.UserTokenEntity
            ]),
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
    })
], ReviewModule);
//# sourceMappingURL=review.module.js.map