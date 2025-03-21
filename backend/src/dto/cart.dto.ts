import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductEntity } from 'src/entites/product.entity';
import { Product_optionEntity } from '../entites/product_option.entity';

export class InsertCartDto {
  @ApiProperty({
    description: '유저 아이디 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '제품 넘버값',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  option_id: Product_optionEntity;

  @ApiProperty({
    description: '수량',
    required: false,
  })
  @IsNumber()
  quantity: number;
}

export class DeleteCartDto {
  @ApiProperty({
    description: '장바구니 번호',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  cart_id: number;

  @ApiProperty({
    description: '사용자 아이디 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

export class UpdateCartDto {
  @ApiProperty({
    description: '장바구니 번호',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  cart_id: number;

  @ApiProperty({
    description: '수량',
    required: true,
  })
  quantity: number;
}
