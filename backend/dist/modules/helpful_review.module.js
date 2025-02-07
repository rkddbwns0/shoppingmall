"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpful_ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const helpful_review_entity_1 = require("../entites/helpful_review.entity");
const product_entity_1 = require("../entites/product.entity");
const review_entity_1 = require("../entites/review.entity");
const user_entity_1 = require("../entites/user.entity");
let Helpful_ReviewModule = class Helpful_ReviewModule {
};
exports.Helpful_ReviewModule = Helpful_ReviewModule;
exports.Helpful_ReviewModule = Helpful_ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                product_entity_1.ProductEntity,
                review_entity_1.ReviewEntity,
                helpful_review_entity_1.Helpful_ReviewEntity,
            ]),
        ],
        controllers: [],
        providers: [],
    })
], Helpful_ReviewModule);
//# sourceMappingURL=helpful_review.module.js.map