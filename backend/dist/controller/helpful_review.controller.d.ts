import { Response } from 'express';
import { Press_helpful_reviewDto } from 'src/dto/helpful_review.dto';
import { Helpful_ReviewServiece } from 'src/services/helpul_review.service';
export declare class Helpful_ReviewController {
    private readonly helpful_reviewSerview;
    constructor(helpful_reviewSerview: Helpful_ReviewServiece);
    press_review(press_helpful_reviewDto: Press_helpful_reviewDto, res: Response): Promise<void>;
}
