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
exports.Like_ProductController = void 0;
const common_1 = require("@nestjs/common");
const like_product_dto_1 = require("../dto/like_product.dto");
const like_product_service_1 = require("../services/like_product.service");
const jwt_service_guard_1 = require("../auth/jwt/jwt-service.guard");
let Like_ProductController = class Like_ProductController {
    constructor(like_productService) {
        this.like_productService = like_productService;
    }
    async press_liked(press_likedDto, res) {
        try {
            const checkData = await this.like_productService.checkData(press_likedDto);
            if (checkData.check === true) {
                const result = await this.like_productService.press_liked(press_likedDto);
                if (result.success === true) {
                    res.status(200).json({ message: result.message });
                }
                else {
                    res.status(403).json({ message: result.message });
                }
            }
            else {
                res.status(403).json({ message: checkData.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.Like_ProductController = Like_ProductController;
__decorate([
    (0, common_1.Post)('/press_liked'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_product_dto_1.Press_likedDto, Object]),
    __metadata("design:returntype", Promise)
], Like_ProductController.prototype, "press_liked", null);
exports.Like_ProductController = Like_ProductController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('like_product'),
    __metadata("design:paramtypes", [like_product_service_1.Like_ProductService])
], Like_ProductController);
//# sourceMappingURL=like_product.controller.js.map