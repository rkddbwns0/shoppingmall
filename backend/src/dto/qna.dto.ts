import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class InsertQnADto {
  @ApiProperty({
    description: '제품 넘버',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  product_no: number;

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
    type: 'string',
    enum: ['O', 'X'],
    default: 'X',
  })
  @IsString()
  private: string;

  @ApiProperty({
    description: '비밀글 확인 비밀번호',
    type: 'string',
  })
  @IsString()
  @MaxLength(20, {
    message: '비밀번호는 4자 이상, 20자 이하로 숫자, 영문으로 입력해 주세요.',
  })
  @MinLength(4, {
    message: '비밀번호는 4자 이상, 20자 이하로 숫자, 영문으로 입력해 주세요.',
  })
  private_pwd: string;
}
