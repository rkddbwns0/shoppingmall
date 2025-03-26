import { InsertReviewDto } from 'src/dto/review.dto';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderItemEntity } from 'src/entites/orderItem.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class ReviewService {
    private readonly userRepository;
    private readonly productRepository;
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly reviewRepository;
    constructor(userRepository: Repository<UserEntity>, productRepository: Repository<ProductEntity>, orderRepository: Repository<OrderEntity>, orderItemRepository: Repository<OrderItemEntity>, reviewRepository: Repository<ReviewEntity>);
    selectReview(product_no: number): Promise<any[]>;
    myReview(user_id: number): Promise<ReviewEntity[]>;
    checkOrder(user_id: number): Promise<{
        check: boolean;
        message?: undefined;
    } | {
        check: boolean;
        message: any;
    }>;
    insertReview(insertReviewDto: InsertReviewDto): Promise<{
        message: any;
        success?: undefined;
    } | {
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
    }>;
    private findItemReview;
}
