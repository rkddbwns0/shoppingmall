import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from 'src/controller/review.controller';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderItemEntity } from 'src/entites/orderItem.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';
import { ReviewService } from 'src/services/review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      ProductEntity,
      UserEntity,
      OrderEntity,
      OrderItemEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
