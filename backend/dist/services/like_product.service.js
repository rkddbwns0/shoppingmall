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
exports.Like_ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const like_product_entity_1 = require("../entites/like_product.entity");
const product_entity_1 = require("../entites/product.entity");
const user_entity_1 = require("../entites/user.entity");
const typeorm_2 = require("typeorm");
let Like_ProductService = class Like_ProductService {
    constructor(user, product, like_product) {
        this.user = user;
        this.product = product;
        this.like_product = like_product;
    }
    async checkData(press_likedDto) {
        try {
            const findUser = await this.user.findOne({
                where: { user_id: press_likedDto.user_id },
            });
            const findProduct = await this.product.findOne({
                where: { product_id: press_likedDto.product_no },
            });
            if (!findUser) {
                throw new common_1.BadRequestException('존재하지 않는 유저입니다.');
            }
            if (!findProduct) {
                throw new common_1.BadRequestException('존재하지 않는 제품입니다.');
            }
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async press_liked(press_likedDto) {
        try {
            const findLikedUser = await this.like_product.findOne({
                where: {
                    user_id: press_likedDto.user_id,
                    product_no: press_likedDto.product_no,
                },
            });
            if (findLikedUser) {
                await this.like_product.delete(press_likedDto);
                return { success: true, message: '좋아요가 취소되었습니다.' };
            }
            const liked = await this.like_product.create(press_likedDto);
            const saveLiked = await this.like_product.save(liked);
            return { success: true, message: '좋아요가 등록되었습니다' };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.Like_ProductService = Like_ProductService;
exports.Like_ProductService = Like_ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(like_product_entity_1.Like_ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], Like_ProductService);
//# sourceMappingURL=like_product.service.js.map