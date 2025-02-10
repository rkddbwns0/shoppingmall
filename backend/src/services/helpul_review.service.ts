import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Press_helpful_reviewDto } from 'src/dto/helpful_review.dto';
import { Helpful_ReviewEntity } from 'src/entites/helpful_review.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Helpful_ReviewServiece {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly product: Repository<ProductEntity>,

    @InjectRepository(ReviewEntity)
    private readonly review: Repository<ReviewEntity>,

    @InjectRepository(Helpful_ReviewEntity)
    private readonly helpful_review: Repository<Helpful_ReviewEntity>,
  ) {}

  async checkData(press_helpful_reviewDto: Press_helpful_reviewDto) {
    try {
      await this.checkUser(press_helpful_reviewDto.user_id);
      await this.checkProduct(press_helpful_reviewDto.product_no);
      await this.checkReview(press_helpful_reviewDto.review_no);
      return { check: true };
    } catch (error) {
      return { check: false, message: error.message };
    }
  }

  async checkUser(user_id: number) {
    const findUser = await this.user.findOne({ where: { user_id: user_id } });
    if (!findUser) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }
  }

  async checkProduct(product_no: number) {
    const findProduct = await this.product.findOne({
      where: { product_id: product_no },
    });

    if (!findProduct) {
      throw new BadRequestException('존재하지 않는 제품입니다.');
    }
  }

  async checkReview(review_no: number) {
    const findReview = await this.review.findOne({
      where: { review_no: review_no },
    });
    if (!findReview) {
      throw new BadRequestException('존재하지 않는 리뷰입니다.');
    }
  }

  async press_helpful_review(press_helpful_reviewDto: Press_helpful_reviewDto) {
    try {
      const press_yn = await this.helpful_review.findOne({
        where: {
          review_no: press_helpful_reviewDto.review_no,
          user_id: press_helpful_reviewDto.user_id,
          product_no: press_helpful_reviewDto.product_no,
        },
      });

      if (!press_yn) {
        const create_press = await this.helpful_review.create(
          press_helpful_reviewDto,
        );
        await this.helpful_review.save(create_press);

        return {
          success: true,
          message: '도움 되었어요 버튼을 활성화 합니다.',
        };
      }

      await this.helpful_review.remove(press_yn);
      return { success: true, message: '도움 되었어요 버튼을 취소합니다.' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
