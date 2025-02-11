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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const review_dto_1 = require("../dto/review.dto");
const review_service_1 = require("../services/review.service");
let ReviewController = class ReviewController {
    constructor(reviewSerview) {
        this.reviewSerview = reviewSerview;
    }
    async insertReview(insertReviewDto, res) {
        try {
            const checkResult = await this.reviewSerview.checkOrder(insertReviewDto.user_id);
            if (checkResult.check === true) {
                const result = await this.reviewSerview.insertReview(insertReviewDto);
                if (result.success === true) {
                    res.status(200).json({ message: '리뷰 작성에 성공하였습니다.' });
                }
                else {
                    res.status(403).json({ message: result.message });
                }
            }
            else {
                res.status(403).json({ message: checkResult.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async selectReview(product_no, res) {
        try {
            const result = await this.reviewSerview.selectReview(product_no);
            console.log(result);
            res.status(200).json({ result });
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 리뷰 작성 라우터' }),
    (0, common_1.Post)('/insert_review'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.InsertReviewDto, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "insertReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '리뷰 내역 라우터' }),
    (0, common_1.Get)('/select_review/:product_no'),
    __param(0, (0, common_1.Param)('product_no')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "selectReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map