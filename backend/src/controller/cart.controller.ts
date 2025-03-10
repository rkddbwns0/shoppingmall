import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { DeleteCartDto, InsertCartDto, UpdateCartDto } from 'src/dto/cart.dto';
import { CartService } from 'src/services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: '장바구니 내역' })
  @Get('select')
  async selectCart(@Param('user_id') user_id: number, @Res() res: Response) {
    try {
      const result = await this.cartService.selectCart(user_id);
      if (result.success === true) {
        res.status(200).json({ result });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '장바구니 저장 라우터' })
  @Post('/insert')
  async insertCart(@Body() insertCartDto: InsertCartDto, @Res() res: Response) {
    try {
      console.log(insertCartDto);
      const result = await this.cartService.insertCart(insertCartDto);
      if (result.success === true) {
        res.status(200).json({ message: '장바구니에 저장되었습니다.' });
      } else {
        res.status(403).json({ message: '장바구니 저장이 실패하였습니다.' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '장바구니 삭제 라우터' })
  @Delete('/delete')
  async deleteCart(@Body() deleteCartDto: DeleteCartDto, @Res() res: Response) {
    try {
      const result = await this.cartService.DeleteCart(deleteCartDto);
      if (result.success === true) {
        res
          .status(200)
          .json({ message: '제품이 장바구니에서 제거되었습니다.' });
      } else {
        res
          .status(403)
          .json({ message: '제품을 장바구니에서 제거하지 못했습니다.' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '장바구니 수량 업데이트 라우터' })
  @Put('/update')
  async updateCart(@Body() updateCartDto: UpdateCartDto, @Res() res: Response) {
    try {
      const result = await this.cartService.UdpateCart(updateCartDto);
      if (result.success === true) {
        res.status(200).json({ message: '제품 수량 변경 성공' });
      } else {
        res.status(403).json({ message: '제품 수량 변경 실패' });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
