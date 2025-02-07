import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Press_likedDto {
  @ApiProperty({ description: '유저 고유 넘버' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: '제품 번호' })
  @IsNotEmpty()
  @IsNumber()
  product_no: number;
}
