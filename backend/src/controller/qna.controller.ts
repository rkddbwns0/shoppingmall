import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { InsertQnADto } from 'src/dto/qna.dto';
import { QnAService } from 'src/services/qna.service';
import { JwtServiceAuthGuard } from '../auth/jwt/jwt-service.guard';
import { Public } from '../auth/decorator/public.decorator';

@UseGuards(JwtServiceAuthGuard)
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
  @Public()
  @Get('/select_qna/:product_no')
  async selectQnA(
    @Param('product_no') product_no: number,
    @Res() res: Response,
  ) {
    try {
      const result = await this.qnaService.selectAllQnATitle(product_no);
      res.status(200).json({ data: result.data });
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({summary: '사용자가 작성한 QnA 확인 라우터'})
  @Get('/myQnA/:user_id')
  async myQnA(@Param('user_id') user_id: number, @Res() res: Response) {
    try {
      const result = await this.qnaService.myQnA(user_id);
      res.status(200).json({result})
    } catch (error) {
      console.error(error);
    }
  }
}
