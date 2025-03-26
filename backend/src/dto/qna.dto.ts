import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ProductEntity } from 'src/entites/product.entity';
import { Product_optionEntity } from '../entites/product_option.entity';

export class InsertQnADto {
  @ApiProperty({
    description: '제품 넘버',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  product_no: ProductEntity;

  @ApiProperty({
    description: '제품 상세 넘버',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  option_id: Product_optionEntity;

  @ApiProperty({
    description: '유저 고유 넘버',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '제목',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: '제목은 5자 이상, 20자 이하로 입력해 주세요.' })
  @MinLength(5, { message: '제목은 5자 이상, 20자 이하로 입력해 주세요.' })
  title: string;

  @ApiProperty({
    description: '질문 내용',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  @MinLength(5)
  content: string;

  @ApiProperty({
    description: '비밀글 적용 여부',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  @IsString()
  private: boolean;

  @ApiProperty({
    description: '비밀글 확인 비밀번호',
    type: 'string',
  })
  @IsString()
  private_pwd: string;
}
