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
exports.Helpful_ReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helpful_review_dto_1 = require("../dto/helpful_review.dto");
const helpul_review_service_1 = require("../services/helpul_review.service");
let Helpful_ReviewController = class Helpful_ReviewController {
    constructor(helpful_reviewSerview) {
        this.helpful_reviewSerview = helpful_reviewSerview;
    }
    async press_review(press_helpful_reviewDto, res) {
        try {
            const checkData = await this.helpful_reviewSerview.checkData(press_helpful_reviewDto);
            if (checkData.check === true) {
                const result = await this.helpful_reviewSerview.press_helpful_review(press_helpful_reviewDto);
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
exports.Helpful_ReviewController = Helpful_ReviewController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '리뷰 도움되었어요. 버튼 클릭 시 상태 라우터' }),
    (0, common_1.Post)('/press_review'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [helpful_review_dto_1.Press_helpful_reviewDto, Object]),
    __metadata("design:returntype", Promise)
], Helpful_ReviewController.prototype, "press_review", null);
exports.Helpful_ReviewController = Helpful_ReviewController = __decorate([
    (0, common_1.Controller)('helpful_review'),
    __metadata("design:paramtypes", [helpul_review_service_1.Helpful_ReviewServiece])
], Helpful_ReviewController);
//# sourceMappingURL=helpful_review.controller.js.map