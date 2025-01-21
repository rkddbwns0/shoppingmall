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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const address_entity_1 = require("../entites/address.entity");
const user_entity_1 = require("../entites/user.entity");
const typeorm_2 = require("typeorm");
let AddressService = class AddressService {
    constructor(addressRepository, userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }
    async insertAddress(insertAddressDto) {
        const findUser = await this.userRepository.findOne({
            where: { user_id: insertAddressDto.user_id },
        });
        if (!findUser) {
            throw new common_1.BadRequestException('존재하지 않는 회원입니다.');
        }
        try {
            if (insertAddressDto.default_addr === 'Y') {
                await this.handleDefaultAddr(insertAddressDto);
                return {
                    success: true,
                    message: '기존 기본 배송지 수정 및 저장 완료',
                };
            }
            else {
                await this.saveDefaultAddress(insertAddressDto);
                return { success: true, message: '기본 배송지 설정 완료' };
            }
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async handleDefaultAddr(insertAddressDto) {
        const default_addr = await this.addressRepository.findOne({
            select: ['address_no', 'default_addr'],
            where: { user_id: insertAddressDto.user_id, default_addr: 'Y' },
        });
        if (default_addr) {
            await this.changeDefaultAdrr(default_addr);
        }
        await this.saveDefaultAddress(insertAddressDto);
    }
    async changeDefaultAdrr(default_addr) {
        try {
            if (default_addr.default_addr === 'Y') {
                await this.addressRepository.update(default_addr.address_no, {
                    default_addr: 'N',
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveDefaultAddress(insertAddressDto) {
        const result = await this.addressRepository.create(insertAddressDto);
        await this.addressRepository.save(result);
    }
    async updateDefaultAddress(updateAddressDto) {
        try {
            const findDefaulAddr = await this.addressRepository.findOne({
                where: { user_id: updateAddressDto.user_id, default_addr: 'Y' },
            });
            if (findDefaulAddr) {
                await this.addressRepository.update(findDefaulAddr.address_no, {
                    default_addr: 'N',
                });
            }
            await this.addressRepository.update(updateAddressDto.address_no, updateAddressDto);
            return { success: true, message: '기본 배송지 설정 변경 완료' };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: '변경 실패' };
        }
    }
    async deleteAddress(deleteAddressDto) {
        try {
            await this.addressRepository.delete(deleteAddressDto);
            return { success: true, message: '주소 삭제 완료' };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: '주소 삭제 실패' };
        }
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.AddressEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AddressService);
//# sourceMappingURL=address.service.js.map