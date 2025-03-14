import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertAddressDto {
  @ApiProperty({
    description: '유저 아이디 고유 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '주문자 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: '우편번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ApiProperty({
    description: '배송지 주소',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: '배송지 상세 주소',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  detail_addr: string;

  @ApiProperty({
    description: '기본 배송지 지정 여부',
    default: ['Y', 'N'],
  })
  @IsString()
  default_addr: string;

  @ApiProperty({
    description: '요청 시 주문 사항',
    default: '조심히 안전하게 배송해주세요.',
    required: false,
    maxLength: 300
  })
  @IsString()
  deliveryMsg: string;
}

export class UpdateAddressDto {
  @ApiProperty({
    description: '유저 배송지 고유 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  address_no: number;

  @ApiProperty({
    description: '유저 아이디 고유 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: '기본 배송지 설정 여부 (Y -> N으로 변경하거나 혹은 그 반대)',
    enum: ['Y', 'N'],
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  default_addr: string;
}

export class DeleteAddressDto {
  @ApiProperty({
    description: '기본 배송지 고유 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  address_no: number;

  @ApiProperty({
    description: '사용자 고유 넘버',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
