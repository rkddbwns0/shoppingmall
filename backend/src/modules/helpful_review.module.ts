import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helpful_ReviewEntity } from 'src/entites/helpful_review.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { ReviewEntity } from 'src/entites/review.entity';
import { UserEntity } from 'src/entites/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      ReviewEntity,
      Helpful_ReviewEntity,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class Helpful_ReviewModule {}
