import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteAddressDto,
  InsertAddressDto,
  UpdateAddressDto,
} from 'src/dto/address.dto';
import { AddressEntity } from 'src/entites/address.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async insertAddress(insertAddressDto: InsertAddressDto) {
    const findUser = await this.userRepository.findOne({
      where: { user_id: insertAddressDto.user_id },
    });

    if (!findUser) {
      throw new BadRequestException('존재하지 않는 회원입니다.');
    }

    try {
      if (insertAddressDto.default_addr === 'Y') {
        await this.handleDefaultAddr(insertAddressDto);
        return {
          success: true,
          message: '기존 기본 배송지 수정 및 저장 완료',
        };
      } else {
        await this.saveDefaultAddress(insertAddressDto);
        return { success: true, message: '기본 배송지 설정 완료' };
      }
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  private async handleDefaultAddr(insertAddressDto: InsertAddressDto) {
    const default_addr = await this.addressRepository.findOne({
      select: ['address_no', 'default_addr'],
      where: { user_id: insertAddressDto.user_id, default_addr: 'Y' },
    });
    if (default_addr) {
      await this.changeDefaultAdrr(default_addr);
    }

    await this.saveDefaultAddress(insertAddressDto);
  }

  private async changeDefaultAdrr(default_addr: AddressEntity): Promise<void> {
    try {
      if (default_addr.default_addr === 'Y') {
        await this.addressRepository.update(default_addr.address_no, {
          default_addr: 'N',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async saveDefaultAddress(insertAddressDto: InsertAddressDto) {
    const result = await this.addressRepository.create(insertAddressDto);
    await this.addressRepository.save(result);
  }

  async updateDefaultAddress(updateAddressDto: UpdateAddressDto) {
    try {
      const findDefaulAddr = await this.addressRepository.findOne({
        where: { user_id: updateAddressDto.user_id, default_addr: 'Y' },
      });

      if (findDefaulAddr) {
        await this.addressRepository.update(findDefaulAddr.address_no, {
          default_addr: 'N',
        });
      }

      await this.addressRepository.update(
        updateAddressDto.address_no,
        updateAddressDto,
      );

      return { success: true, message: '기본 배송지 설정 변경 완료' };
    } catch (error) {
      console.error(error);
      return { success: false, message: '변경 실패' };
    }
  }

  async deleteAddress(deleteAddressDto: DeleteAddressDto) {
    try {
      await this.addressRepository.delete(deleteAddressDto);
      return { success: true, message: '주소 삭제 완료' };
    } catch (error) {
      console.error(error);
      return { success: false, message: '주소 삭제 실패' };
    }
  }
}
