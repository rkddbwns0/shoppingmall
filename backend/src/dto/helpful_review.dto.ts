import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Press_helpful_reviewDto {
  @ApiProperty({ description: '리뷰 넘버' })
  @IsNotEmpty()
  @IsNumber()
  review_no: number;

  @ApiProperty({ description: '사용자 고유 넘버' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: '제품 고유 넘버' })
  @IsNotEmpty()
  @IsNumber()
  product_no: number;
}
