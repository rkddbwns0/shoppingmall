import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Press_likedDto } from 'src/dto/like_product.dto';
import { Like_ProductEntity } from 'src/entites/like_product.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Like_ProductService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly product: Repository<ProductEntity>,

    @InjectRepository(Like_ProductEntity)
    private readonly like_product: Repository<Like_ProductEntity>,
  ) {}

  async checkData(press_likedDto: Press_likedDto) {
    try {
      const findUser = await this.user.findOne({
        where: { user_id: press_likedDto.user_id },
      });
      const findProduct = await this.product.findOne({
        where: { product_id: press_likedDto.product_no },
      });

      if (!findUser) {
        throw new BadRequestException('존재하지 않는 유저입니다.');
      }

      if (!findProduct) {
        throw new BadRequestException('존재하지 않는 제품입니다.');
      }

      return { check: true };
    } catch (error) {
      return { check: false, message: error.message };
    }
  }

  async press_liked(press_likedDto: Press_likedDto) {
    try {
      const findLikedUser = await this.like_product.findOne({
        where: {
          user_id: press_likedDto.user_id,
          product_no: press_likedDto.product_no,
        },
      });
      if (findLikedUser) {
        await this.like_product.delete(press_likedDto);
        return { success: true, message: '좋아요가 취소되었습니다.' };
      }
      const liked = await this.like_product.create(press_likedDto);
      const saveLiked = await this.like_product.save(liked);

      return { success: true, message: '좋아요가 등록되었습니다' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
