"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
const product_controller_1 = require("../controller/product.controller");
const product_entity_1 = require("../entites/product.entity");
const product_categories_entity_1 = require("../entites/product_categories.entity");
const product_option_entity_1 = require("../entites/product_option.entity");
const product_service_1 = require("../services/product.service");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.ProductEntity,
                product_categories_entity_1.ProductCateogryEntity,
                product_option_entity_1.Product_optionEntity,
            ]),
            cache_manager_1.CacheModule.register({
                store: cache_manager_redis_store_1.redisStore,
                host: 'localhost',
                port: 6379,
                ttl: 600,
                isGlobal: true,
            }),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map