import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ProductEntity } from 'src/entites/product.entity';

export class InsertReviewDto {
  @ApiProperty({ description: '주문 번호' })
  @IsNotEmpty()
  @IsNumber()
  order_no: number;

  @ApiProperty({
    description: '제품 번호',
  })
  @IsNotEmpty()
  @IsNumber()
  product_no: number;

  @ApiProperty({
    description: '유저 고유 넘버',
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '리뷰 내용',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  content: string;

  @ApiProperty({
    description: '별점 (예: 3.5, 4.5, ...)',
    example: 4.5,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  scope: number;
}
