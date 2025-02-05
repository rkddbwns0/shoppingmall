import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class QnA_AnswerDto {
  @ApiProperty({ description: '관리자 고유 번호' })
  @IsNotEmpty()
  @IsNumber()
  admin_no: number;

  @ApiProperty({ description: '질문 번호' })
  @IsNotEmpty()
  @IsNumber()
  qna_no: number;

  @ApiProperty({ description: '답변 내용' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  @MinLength(20)
  contents: string;
}
