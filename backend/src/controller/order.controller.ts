import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { InsertOrderDto } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: '제품 주문 라우터(장바구니 x -> 제품을 바로 구매할 경우',
  })
  @Post('/insert')
  async insertOrder(
    @Body() insertOrderDto: InsertOrderDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.orderService.insertOrder(insertOrderDto);
      if (result.success === true) {
        res.status(200).json({ message: '구매가 완료되었습니다.' });
      } else {
        res.status(403).json({ message: '구매에 실패하였습니다.' });
      }
    } catch (error) {
      console.error(error);
      res.status(403).json({ message: '구매에 실패하였습니다.', error: error });
    }
  }
}
