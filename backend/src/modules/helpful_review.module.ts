import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helpful_ReviewController } from 'src/controller/helpful_review.controller';
import { Helpful_ReviewEntity } from 'src/entites/helpful_review.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Helpful_ReviewServiece } from 'src/services/helpul_review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      ReviewEntity,
      Helpful_ReviewEntity,
    ]),
  ],
  controllers: [Helpful_ReviewController],
  providers: [Helpful_ReviewServiece],
})
export class Helpful_ReviewModule {}
