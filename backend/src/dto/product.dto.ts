import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Gender } from 'src/components/product_enum';

export class RegProductDto {
  @ApiProperty({
    description: '제품 카테고리 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  product_category: number;

  @ApiProperty({
    example: '~~반팔',
    description: '제품 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @ApiProperty({
    example: '여름에 입기 좋은 얇은 반팔입니다.',
    description: '제품 설명',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  product_content: string;

  @ApiProperty({
    example: '[남성, 여성, 남녀공용]',
    description: '성별',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: '제품 사이즈',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  size: string;

  @ApiProperty({
    description: '제품 색상',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({
    example: '50,000',
    description: '제품 가격',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: '50,000 -> 39,900',
    description: '제품 세일 가격',
    required: false,
  })
  @IsNumber()
  sale_price: number;

  @ApiProperty({
    example: '10개',
    description: '제품 수량',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}

export class UpdateProductDto {
  @ApiProperty({
    description: '제품 번호',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({
    description: '제품 설명',
    required: false,
  })
  @IsString()
  product_content: string;

  @ApiProperty({
    description: '제품 가격',
    required: false,
  })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '세일 가격', required: false })
  @IsNumber()
  sale_price: number;

  @ApiProperty({ description: '제품 수량', required: false })
  stock: number;
}
