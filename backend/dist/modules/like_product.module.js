"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like_ProductModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const like_product_controller_1 = require("../controller/like_product.controller");
const like_product_entity_1 = require("../entites/like_product.entity");
const product_entity_1 = require("../entites/product.entity");
const user_entity_1 = require("../entites/user.entity");
const like_product_service_1 = require("../services/like_product.service");
const user_token_entity_1 = require("../entites/user_token.entity");
let Like_ProductModule = class Like_ProductModule {
};
exports.Like_ProductModule = Like_ProductModule;
exports.Like_ProductModule = Like_ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([like_product_entity_1.Like_ProductEntity, user_entity_1.UserEntity, product_entity_1.ProductEntity, user_token_entity_1.UserTokenEntity]),
        ],
        controllers: [like_product_controller_1.Like_ProductController],
        providers: [like_product_service_1.Like_ProductService],
    })
], Like_ProductModule);
//# sourceMappingURL=like_product.module.js.map