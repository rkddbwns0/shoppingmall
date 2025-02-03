import { InsertReviewDto } from 'src/dto/review.dto';
import { OrderEntity } from 'src/entites/order.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class ReviewService {
    private readonly userRepository;
    private readonly productRepository;
    private readonly orderRepository;
    private readonly reviewRepository;
    constructor(userRepository: Repository<UserEntity>, productRepository: Repository<ProductEntity>, orderRepository: Repository<OrderEntity>, reviewRepository: Repository<ReviewEntity>);
    checkOrder(user_id: number): Promise<{
        check: boolean;
        message?: undefined;
    } | {
        check: boolean;
        message: any;
    }>;
    insertReview(insertReviewDto: InsertReviewDto): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
    }>;
}
