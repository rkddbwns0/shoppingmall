import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  phone: number;

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

  @ApiProperty({
    example: '닉네임입니다',
    description: '사용자 닉네임',
    required: true,
    default: '유저 name',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  nickname: string;
}
