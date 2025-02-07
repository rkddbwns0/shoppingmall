import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like_ProductController } from 'src/controller/like_product.controller';
import { Like_ProductEntity } from 'src/entites/like_product.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Like_ProductService } from 'src/services/like_product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like_ProductEntity, UserEntity, ProductEntity]),
  ],
  controllers: [Like_ProductController],
  providers: [Like_ProductService],
})
export class Like_ProductModule {}
