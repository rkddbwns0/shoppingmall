import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '01012341234',
    description: '사용자 휴대폰 번호',
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('KR')
  @MaxLength(11)
  phone: string;

  @ApiProperty({
    example: 'user@maver.com',
    description: '유저 계정',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(10)
  @MaxLength(30)
  email: string;

  @ApiProperty({
    example: 'user123',
    description: '유저 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
