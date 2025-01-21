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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const address_dto_1 = require("../dto/address.dto");
const address_service_1 = require("../services/address.service");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async insertAddress(insertAddressDto, res) {
        try {
            const result = await this.addressService.insertAddress(insertAddressDto);
            if (result.success === true) {
                res.status(200).json({ message: '배송지 저장 성공' });
            }
            else {
                res.status(403).json({ message: '배송지 저장 실패' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateAddress(updateAddressDto, res) {
        try {
            const result = await this.addressService.updateDefaultAddress(updateAddressDto);
            if (result.success === true) {
                res.status(200).json({ message: '변경 완료' });
            }
            else {
                res.status(403).json({ message: '변경 실패' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async DeleteAddressDto(deleteAddressDto, res) {
        try {
            const result = await this.addressService.deleteAddress(deleteAddressDto);
            if (result.success === true) {
                res.status(200).json({ message: '삭제 완료' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(403).json({ message: '삭제 실패' });
        }
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 배송지 저장 라우터' }),
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_dto_1.InsertAddressDto, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "insertAddress", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '기본 배송지 변경 라우터' }),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_dto_1.UpdateAddressDto, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "updateAddress", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 배송지 삭제 라우터' }),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_dto_1.DeleteAddressDto, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "DeleteAddressDto", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map