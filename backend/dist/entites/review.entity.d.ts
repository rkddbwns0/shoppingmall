import { Helpful_ReviewEntity } from './helpful_review.entity';
export declare class ReviewEntity {
    review_no: number;
    product_no: number;
    user_id: number;
    contents: string;
    scope: number;
    write_at: Date;
    helpful_review: Helpful_ReviewEntity[];
}
