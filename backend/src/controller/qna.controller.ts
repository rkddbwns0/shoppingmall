import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { InsertQnADto } from 'src/dto/qna.dto';
import { QnAService } from 'src/services/qna.service';

@Controller('QnA')
export class QnAController {
  constructor(private readonly qnaService: QnAService) {}

  @ApiOperation({ summary: '유저 Q&A 작성 라운터' })
  @Post('/insert_qna')
  async insertQnA(@Body() insertQnADto: InsertQnADto, @Res() res: Response) {
    try {
      const result = await this.qnaService.insertQnA(insertQnADto);
      if (result.success === true) {
        res.status(200).json({ message: 'Q&A 작성이 완료되었습니다.' });
      } else {
        res.status(403).json({ message: result.message });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: 'Q&A 목록 라우터 (없을 경우에는 null)' })
  @Get('/select_qna')
  async selectQnA(
    @Query('product_no') product_no: number,
    @Res() res: Response,
  ) {
    try {
      const result = await this.qnaService.selectAllQnA(product_no);
      res.status(200).json({ data: result.data });
    } catch (error) {
      console.error(error);
    }
  }
}
