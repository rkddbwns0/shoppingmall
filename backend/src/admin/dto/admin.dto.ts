import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: '홍길동',
    description: '관리자 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'admin@naver.com',
    description: '관리자 계정',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  email: string;

  @ApiProperty({
    example: 'admin123123',
    description: '관리자 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class AdminLoginDto {
  @ApiProperty({
    example: 'admin@naver.com',
    description: '관리자 계정',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  email: string;

  @ApiProperty({
    example: 'admin123123',
    description: '관리자 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
