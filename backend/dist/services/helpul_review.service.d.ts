import { Press_helpful_reviewDto } from 'src/dto/helpful_review.dto';
import { Helpful_ReviewEntity } from 'src/entites/helpful_review.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class Helpful_ReviewServiece {
    private readonly user;
    private readonly product;
    private readonly review;
    private readonly helpful_review;
    constructor(user: Repository<UserEntity>, product: Repository<ProductEntity>, review: Repository<ReviewEntity>, helpful_review: Repository<Helpful_ReviewEntity>);
    checkData(press_helpful_reviewDto: Press_helpful_reviewDto): Promise<{
        check: boolean;
        message?: undefined;
    } | {
        check: boolean;
        message: any;
    }>;
    checkUser(user_id: number): Promise<void>;
    checkProduct(product_no: number): Promise<void>;
    checkReview(review_no: number): Promise<void>;
    press_helpful_review(press_helpful_reviewDto: Press_helpful_reviewDto): Promise<{
        success: boolean;
        message: any;
    }>;
}
