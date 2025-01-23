import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductEntity } from 'src/entites/product.entity';

export class OrderItemsDto {
  @ApiProperty({ description: '유저 고유 넘버', required: true })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: '주문 번호', required: true })
  @IsNotEmpty()
  @IsNumber()
  order_no: number;

  @ApiProperty({ description: '제품 번호', required: true })
  @IsNotEmpty()
  @IsNumber()
  product_no: ProductEntity;

  @ApiProperty({ description: '제품 수량', required: true })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: '제품 1개당 가격', required: true })
  @IsNotEmpty()
  @IsNumber()
  unit_price: number;

  @ApiProperty({ description: '주문 제품 총 가격', required: true })
  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
