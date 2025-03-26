import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertReviewDto } from 'src/dto/review.dto';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderItemEntity } from 'src/entites/orderItem.entity';
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

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,

    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async selectReview(product_no: number) {
    try {
      const product_reviews = await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoin(
          (qb) =>
            qb
              .select('helpful_review.review_no', 'review_no')
              .addSelect('COUNT(helpful_review.review_no)', 'helpful_count')
              .from('helpful_review', 'helpful_review')
              .groupBy('helpful_review.review_no'),
          'helpful_count',
          'review.review_no = helpful_count.review_no',
        )
        .where('review.product_no = :product_no', { product_no })
        .select([
          'review.*',
          'IFNULL(helpful_count.helpful_count, 0) as helpful_count',
        ])
        .orderBy('review.write_at', 'DESC')
        .getRawMany();

      if (!product_reviews) {
        return null;
      }

      return product_reviews;
    } catch (error) {
      console.error(error);
    }
  }

  async myReview(user_id: number) {
    try {
      const review = await this.reviewRepository.find({
        where: {user_id: user_id},
        relations: ['option_id']
      })
      if (!review) {
        return null
      }
      return review;
    } catch (error) {
      console.error(error)
    }
  }

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
      const result = await this.findItemReview(
        insertReviewDto.order_no,
        insertReviewDto.option_id,
        insertReviewDto.user_id,
      );

      console.log('result : ', result)

      if (result.check === true) {
        const writeReview = this.reviewRepository.create(insertReviewDto);
        const saveReview = await this.reviewRepository.save(writeReview);
        await this.orderItemRepository.update(result.result, {
          review_status: true,
        });

        if (!saveReview) {
          throw new BadRequestException(
            '리뷰 작성에 실패하였습니다. 다시 시도해 주세요.',
          );
        }
      } else {
        return { message: result.message };
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }

  private async findItemReview(
    order_no: number,
    option_id: number,
    user_id: number,
  ) {
    try {
      const findItem = await this.orderItemRepository
        .createQueryBuilder('orderItems')
        .leftJoin('orderItems.order_no', 'order')
        .leftJoin('orderItems.option_id', 'product_option')
        .select(
          [
            'orderItems.orderItem_no AS orderItem_no',
            'orderItems.review_status AS review_status',
            'order.order_no AS order_no',
            'product_option.option_id AS option_id'
          ]
        )
        .where('orderItems.user_id = :user_id', { user_id: user_id })
        .andWhere('orderItems.order_no = :order_no', { order_no: order_no })
        .andWhere('orderItems.option_id = :option_id', { option_id: option_id })
        .getRawOne()

      if (!findItem) {
        throw new BadRequestException('구매 내역에 존재하지 않는 제품입니다.');
      }

      if (findItem.review_status === 1) {
        throw new BadRequestException('이미 리뷰를 작성한 제품입니다.');
      }

      return { check: true, result: findItem };
    } catch (error) {
      return { check: false, message: error.message };
    }
  }
}
