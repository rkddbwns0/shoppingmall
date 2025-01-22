import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertOrderDto {
  @ApiProperty({
    description: '유저 고유 넘버값',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '제품 고유 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  product_no: number;

  @ApiProperty({
    description: '구매 제품 수량',
    default: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: '제품 주문 현황',
    enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
    default: '주문 완료',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  order_state: string;

  @ApiProperty({
    description: '환불 사유',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  refund_reason?: string;

  @ApiProperty({
    description: '사용자 기본 배송지 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  address_no: number;

  @ApiProperty({
    description: '결제 방식',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({
    description: '제품 총 구매 가격',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}

export class CartOrderDto {
  @ApiProperty({
    description: '유저 고유 넘버값',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '제품 고유 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  product_no: number[];

  @ApiProperty({
    description: '구매 제품 수량',
    default: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: '제품 주문 현황',
    enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
    default: '주문 완료',
  })
  @IsNotEmpty()
  @IsString()
  order_state: string;

  @ApiProperty({
    description: '환불 사유',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  refund_reason?: string;

  @ApiProperty({
    description: '사용자 기본 배송지 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  address_no: number;

  @ApiProperty({
    description: '결제 방식',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({
    description: '제품 총 구매 가격',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
