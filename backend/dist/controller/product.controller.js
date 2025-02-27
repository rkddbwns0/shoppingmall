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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/decorator/public.decorator");
const product_dto_1 = require("../dto/product.dto");
const product_service_1 = require("../services/product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async randomProduct(res) {
        try {
            const result = await this.productService.randomProduct();
            res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
        }
    }
    async selectProductCategory(category_id) {
        if (!category_id) {
            throw new common_1.BadRequestException('카테고리 넘버가 없습니다.');
        }
        return await this.productService.selectProductCategory(category_id);
    }
    async selectProduct(product_category) {
        if (!product_category) {
            throw new common_1.BadRequestException('카테고리 넘버가 없습니다.');
        }
        return await this.productService.selectProduct(product_category);
    }
    async selectOneProduct(product_id) {
        if (!product_id) {
            throw new common_1.BadRequestException('제품 넘버가 없습니다. 다시 확인해 주세요.');
        }
        return await this.productService.selectOneProduct(product_id);
    }
    async insertProduct(regProductDto, res) {
        try {
            const result = await this.productService.insertProduct(regProductDto);
            if (result.success === true) {
                res
                    .status(200)
                    .json({ message: '제품 등록이 완료되었습니다.', result: result });
            }
            else {
                res.json(403).json({
                    message: '데이터 등록에 실패하였습니다. 입력한 값을 다시 한 번 확인해 주세요.',
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateProduct(updateProductDto, res) {
        try {
            const result = await this.productService.updateProduct(updateProductDto);
            if (result.success === true) {
                res.status(200).json({ message: '정보 수정이 완료되었습니다.' });
            }
            else {
                res.status(403).json({
                    message: '정보 수정에 실패하였습니다. 정보를 다시 확인해 주세요.',
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '10분마다 랜덤한 상품 데이터 5개를 가져옴' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/random_product'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "randomProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'product_category 테이블에 해당 번호의 자식 데이터를 가져옴',
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/select_category/:category_id'),
    __param(0, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "selectProductCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '입력 받은 값에 대한 product 데이터 정보를 가져옴' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/select_products/:product_category'),
    __param(0, (0, common_1.Param)('product_category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "selectProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 제품 정보 라우터' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/select_product/:product_id'),
    __param(0, (0, common_1.Param)('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "selectOneProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '제품 등록 라우터' }),
    (0, common_1.Post)('/insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.RegProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "insertProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '제품 정보 수정 라우터' }),
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map