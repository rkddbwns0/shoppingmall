import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertReviewDto } from 'src/dto/review.dto';
import { OrderEntity } from 'src/entites/order.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async checkOrder(user_id: number) {
    try {
      const checkOrderState = await this.orderRepository.find({
        where: { user_id: user_id, order_state: '배송 완료' },
      });

      if (checkOrderState.length === 0) {
        throw new BadRequestException('리뷰 작성이 가능한 제품이 없습니다.');
      }

      return { check: true };
    } catch (error) {
      return { check: false, message: error.message };
    }
  }

  async insertReview(insertReviewDto: InsertReviewDto) {
    try {
      const writeReview = await this.reviewRepository.create(insertReviewDto);
      const saveReview = await this.reviewRepository.save(writeReview);
      if (!saveReview) {
        throw new BadRequestException(
          '리뷰 작성에 실패하였습니다. 다시 시도해 주세요.',
        );
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }
}
