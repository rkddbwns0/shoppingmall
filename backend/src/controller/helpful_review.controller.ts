import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { Press_helpful_reviewDto } from 'src/dto/helpful_review.dto';
import { Helpful_ReviewServiece } from 'src/services/helpul_review.service';

@Controller('helpful_review')
export class Helpful_ReviewController {
  constructor(private readonly helpful_reviewSerview: Helpful_ReviewServiece) {}

  @ApiOperation({ summary: '리뷰 도움되었어요. 버튼 클릭 시 상태 라우터' })
  @Post('/press_review')
  async press_review(
    @Body() press_helpful_reviewDto: Press_helpful_reviewDto,
    @Res() res: Response,
  ) {
    try {
      const checkData = await this.helpful_reviewSerview.checkData(
        press_helpful_reviewDto,
      );
      if (checkData.check === true) {
        const result = await this.helpful_reviewSerview.press_helpful_review(
          press_helpful_reviewDto,
        );
        if (result.success === true) {
          res.status(200).json({ message: result.message });
        } else {
          res.status(403).json({ message: result.message });
        }
      } else {
        res.status(403).json({ message: checkData.message });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
