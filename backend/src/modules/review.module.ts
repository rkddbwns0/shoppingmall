import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from 'src/controller/review.controller';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderItemEntity } from 'src/entites/orderItem.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';
import { ReviewService } from 'src/services/review.service';
import { UserTokenEntity } from '../entites/user_token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      ProductEntity,
      UserEntity,
      OrderEntity,
      OrderItemEntity,
      UserTokenEntity
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
