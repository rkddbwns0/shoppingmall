import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { QnA_AnswerService } from '../services/qna_answer.service';
import { Response } from 'express';
import { QnA_AnswerDto } from '../dto/qna_answer.dto';
import { Public } from '../../auth/decorator/public.decorator';

@Controller('admin/qna')
@Public()
export class QnA_AdminController {
  constructor(private readonly qna_answerService: QnA_AnswerService) {}

  @Get('/all_qna')
  async all_qna(@Res() res: Response) {
    try {
      const result = await this.qna_answerService.all_qna();
      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/select_qna')
  async select_qna(@Query('qna_no') qna_no: number, @Res() res: Response) {
    try {
      const result = await this.qna_answerService.select_qna(qna_no);
      if (result.success === true) {
        res.status(200).json({ data: result.result });
      } else {
        res.status(403).json({ message: result.message });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/qna_answer')
  async qna_answer(@Body() qna_answerDto: QnA_AnswerDto, @Res() res: Response) {
    try {
      const check_admin = await this.qna_answerService.checkAdmin(
        qna_answerDto.admin_no,
      );
      console.log(check_admin);
      if (check_admin.check === true) {
        const result =
          await this.qna_answerService.admin_qna_answer(qna_answerDto);
        if (result.success === true) {
          res.status(200).json({ message: '답변이 등록되었습니다!' });
        } else {
          res
            .status(403)
            .json({ message: '답변 등록에 실패했습니다. 다시 확인해 주세요.' });
        }
      } else {
        res.status(403).json({ message: check_admin.message });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
