import { Body, Controller, Delete, Post, Put, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import {
  DeleteAddressDto,
  InsertAddressDto,
  UpdateAddressDto,
} from 'src/dto/address.dto';
import { AddressService } from 'src/services/address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: '주문 배송지 저장 라우터' })
  @Post('insert')
  async insertAddress(
    @Body() insertAddressDto: InsertAddressDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.addressService.insertAddress(insertAddressDto);
      if (result.success === true) {
        res.status(200).json({ message: '배송지 저장 성공' });
      } else {
        res.status(403).json({ message: '배송지 저장 실패' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '기본 배송지 변경 라우터' })
  @Put('update')
  async updateAddress(
    @Body() updateAddressDto: UpdateAddressDto,
    @Res() res: Response,
  ) {
    try {
      const result =
        await this.addressService.updateDefaultAddress(updateAddressDto);
      if (result.success === true) {
        res.status(200).json({ message: '변경 완료' });
      } else {
        res.status(403).json({ message: '변경 실패' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '주문 배송지 삭제 라우터' })
  @Delete('delete')
  async DeleteAddressDto(
    @Body() deleteAddressDto: DeleteAddressDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.addressService.deleteAddress(deleteAddressDto);
      if (result.success === true) {
        res.status(200).json({ message: '삭제 완료' });
      }
    } catch (error) {
      console.error(error);
      res.status(403).json({ message: '삭제 실패' });
    }
  }
}
