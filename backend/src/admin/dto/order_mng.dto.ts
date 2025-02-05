import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderMngDto {
  @ApiProperty({ description: '관리자 아이디' })
  @IsNotEmpty()
  @IsNumber()
  admin_id: number;

  @ApiProperty({ description: '고객 주문 번호' })
  @IsNotEmpty()
  @IsNumber()
  order_no: number;

  @ApiProperty({ description: '고객 주문 상태' })
  @IsNotEmpty()
  @IsString()
  order_state: string;
}
