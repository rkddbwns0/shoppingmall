import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import {
  CartOrderDto,
  InsertOrderDto,
  RefundOrderDto,
} from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';
import { Public } from '../auth/decorator/public.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '주문 내역 확인 라우터' })
  @Public()
  @Get('/select')
  async orderList(@Param('user_id') user_id: number, @Res() res: Response) {
    try {
      const result = await this.orderService.orderList(user_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: '에러' });
    }
  }

  @ApiOperation({
    summary: '제품 주문 라우터',
  })
  @Public()
  @Post('/insert')
  async insertOrder(
    @Body() insertOrderDto: InsertOrderDto,
    @Res() res: Response,
  ) {
    try {
      if (!insertOrderDto) {
        return res
          .status(400)
          .json({ message: 'insertOrderDto 데이터가 필요합니다' });
      }
      const result = await this.orderService.insertOrder(insertOrderDto);
      if (result.success === true) {
        return res.status(200).json({ message: '구매가 완료되었습니다.' });
      } else {
        return res.status(403).json({ message: '구매에 실패하였습니다.' });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(403)
        .json({ message: '구매에 실패하였습니다.', error: error });
    }
  }

  @ApiOperation({
    summary: '장바구니 제품 구매 라우터',
  })
  @Public()
  @Post('/cart_order')
  async cartOrder(@Body() cartOrderDto: CartOrderDto, @Res() res: Response) {
    try {
      const result = await this.orderService.cartOrder(cartOrderDto);
      if (result.success === true) {
        return res
          .status(200)
          .json({ message: '장바구니 제품들이 구매되었습니다.' });
      } else {
        return res
          .status(403)
          .json({ message: '장바구니 제품 구매에 실패하였습니다.' });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(403)
        .json({ message: '구매에 실패하였습니다.', error: error });
    }
  }

  @ApiOperation({ summary: '고객 환불 요청 라우터' })
  @Public()
  @Put('/refund')
  async refundOrder(
    @Body() refundOrderDto: RefundOrderDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.orderService.refundOrder(refundOrderDto);
      if (result.success === true) {
        res
          .status(200)
          .json({ message: '환불 요청이 정상적으로 완료되었습니다.' });
      } else {
        res.status(403).json({ message: result.message });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
