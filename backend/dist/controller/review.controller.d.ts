import { Response } from 'express';
import { InsertReviewDto } from 'src/dto/review.dto';
import { ReviewService } from 'src/services/review.service';
export declare class ReviewController {
    private readonly reviewSerview;
    constructor(reviewSerview: ReviewService);
    insertReview(insertReviewDto: InsertReviewDto, res: Response): Promise<void>;
    selectReview(product_no: number, res: Response): Promise<void>;
}
