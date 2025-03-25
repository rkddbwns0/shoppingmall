import { Body, Controller, Put, Res } from '@nestjs/common';
import { OrderMngService } from '../services/order_mng.service';
import { ApiOperation } from '@nestjs/swagger';
import { OrderMngDto } from '../dto/order_mng.dto';
import { Response } from 'express';
import { Public } from '../../auth/decorator/public.decorator';

@Controller('admin/order_mng')
@Public()
export class OrderMngController {
  constructor(private readonly orderMngService: OrderMngService) {}

  @ApiOperation({ summary: '관리자 주문 상태 관리 라우터' })
  @Put('/update_order_state')
  async successRefund(@Body() orderMngDto: OrderMngDto, @Res() res: Response) {
    try {
      const checkAdmin = await this.orderMngService.checkAdmin(
        orderMngDto.admin_id,
      );
      if (checkAdmin.check === true) {
        const result = await this.orderMngService.orderMng(orderMngDto);
        if (result.success === true) {
          res.status(200).json({ message: '주문 상태가 변경되었습니다.' });
        } else {
          res.status(403).json({ message: result.message });
        }
      } else {
        res.status(403).json({ message: checkAdmin.message });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
