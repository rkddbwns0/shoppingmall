import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entites/admin.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderMngDto } from '../dto/order_mng.dto';

@Injectable()
export class OrderMngService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly admin: Repository<AdminEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async checkAdmin(admin_id: number) {
    try {
      const findAdmin = await this.admin.findOne({
        where: { admin_id: admin_id },
      });

      if (!findAdmin) {
        throw new BadRequestException(
          '존재하지 않는 관리자입니다. 다시 확인해 주세요.',
        );
      }

      return { check: true };
    } catch (error) {
      return { check: false, message: error.message };
    }
  }

  async orderMng(orderMngDto: OrderMngDto) {
    try {
      const findOrderState = await this.orderRepository.findOne({
        where: {
          order_no: orderMngDto.order_no,
        },
      });

      if (!findOrderState) {
        throw new BadRequestException(
          '존재하지 않는 주문 번호입니다. 다시 확인해 주세요.',
        );
      }

      if (findOrderState.order_state === '환불 완료') {
        throw new BadRequestException(
          '이미 환불이 완료된 주문입니다. 다시 확인해 주세요.',
        );
      }

      switch (orderMngDto.order_state) {
        case (orderMngDto.order_state = '배송 중'):
          if (findOrderState.order_state !== '주문 완료') {
            throw new BadRequestException(
              '주문이 완료된 상태에서만 변경이 가능합니다. 다시 확인해 주세요.',
            );
          }
          break;

        case (orderMngDto.order_state = '배송 완료'):
          if (findOrderState.order_state !== '배송 중') {
            throw new BadRequestException(
              '배송 중인 상태에서만 변경이 가능합니다. 다시 확인해 주세요.',
            );
          }
          break;

        case (orderMngDto.order_state = '환불 완료'):
          if (findOrderState.order_state !== '환불 진행 중') {
            throw new BadRequestException(
              '환불 진행 중인 상태의 주문만 변경이 가능합니다. 다시 확인해 주세요.',
            );
          }
          break;
        default:
          throw new BadRequestException(
            '유효하지 않은 주문 상태입니다. 다시 확인해 주세요.',
          );
      }

      await this.orderRepository.update(orderMngDto.order_no, {
        order_state: orderMngDto.order_state,
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }
}
