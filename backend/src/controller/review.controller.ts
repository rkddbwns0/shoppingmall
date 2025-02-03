import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { InsertReviewDto } from 'src/dto/review.dto';
import { ReviewService } from 'src/services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewSerview: ReviewService) {}

  @ApiOperation({ summary: '유저 리뷰 작성 라우터' })
  @Post('/insert_review')
  async insertReview(
    @Body() insertReviewDto: InsertReviewDto,
    @Res() res: Response,
  ) {
    try {
      const checkResult = await this.reviewSerview.checkOrder(
        insertReviewDto.user_id,
      );
      if (checkResult.check === true) {
        const result = await this.reviewSerview.insertReview(insertReviewDto);
        if (result.success === true) {
          res.status(200).json({ message: '리뷰 작성에 성공하였습니다.' });
        } else {
          res.status(403).json({ message: result.message });
        }
      } else {
        res.status(403).json({ message: checkResult.message });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
