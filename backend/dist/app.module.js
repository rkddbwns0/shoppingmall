"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const admin_entity_1 = require("./entites/admin.entity");
const admin_moule_1 = require("./admin/modules/admin.moule");
const user_entity_1 = require("./entites/user.entity");
const product_entity_1 = require("./entites/product.entity");
const product_categories_entity_1 = require("./entites/product_categories.entity");
const product_module_1 = require("./modules/product.module");
const cart_module_1 = require("./modules/cart.module");
const cart_entity_1 = require("./entites/cart.entity");
const address_entity_1 = require("./entites/address.entity");
const address_module_1 = require("./modules/address.module");
const order_entity_1 = require("./entites/order.entity");
const orderItem_entity_1 = require("./entites/orderItem.entity");
const order_module_1 = require("./modules/order.module");
const review_entity_1 = require("./entites/review.entity");
const review_module_1 = require("./modules/review.module");
const qna_entity_1 = require("./entites/qna.entity");
const qna_module_1 = require("./modules/qna.module");
const qna_answer_entity_1 = require("./entites/qna_answer.entity");
const qna_answer_module_1 = require("./admin/modules/qna_answer.module");
const order_mng_module_1 = require("./admin/modules/order_mng.module");
const like_product_entity_1 = require("./entites/like_product.entity");
const like_product_module_1 = require("./modules/like_product.module");
const helpful_review_entity_1 = require("./entites/helpful_review.entity");
const helpful_review_module_1 = require("./modules/helpful_review.module");
const user_module_1 = require("./modules/user.module");
const product_option_entity_1 = require("./entites/product_option.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    charset: 'utf8mb4',
                    synchronize: false,
                    retryAttempts: 1,
                    retryDelay: 3000,
                    entities: [
                        admin_entity_1.AdminEntity,
                        user_entity_1.UserEntity,
                        product_entity_1.ProductEntity,
                        product_option_entity_1.Product_optionEntity,
                        product_categories_entity_1.ProductCateogryEntity,
                        cart_entity_1.CartEntity,
                        address_entity_1.AddressEntity,
                        order_entity_1.OrderEntity,
                        orderItem_entity_1.OrderItemEntity,
                        review_entity_1.ReviewEntity,
                        qna_entity_1.QnAEntity,
                        qna_answer_entity_1.QnA_AnswerEntity,
                        like_product_entity_1.Like_ProductEntity,
                        helpful_review_entity_1.Helpful_ReviewEntity,
                    ],
                }),
            }),
            admin_moule_1.AdminModule,
            user_module_1.UserModule,
            qna_answer_module_1.QnA_AnswerModule,
            product_module_1.ProductModule,
            cart_module_1.CartModule,
            address_module_1.AddressModule,
            order_module_1.OrderModule,
            review_module_1.ReviewModule,
            qna_module_1.QnAModoule,
            order_mng_module_1.OrderMngModule,
            like_product_module_1.Like_ProductModule,
            helpful_review_module_1.Helpful_ReviewModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map