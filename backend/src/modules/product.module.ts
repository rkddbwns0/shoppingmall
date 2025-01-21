import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controller/product.controller';
import { ProductEntity } from 'src/entites/product.entity';
import { ProductCateogryEntity } from 'src/entites/product_categories.entity';
import { ProductService } from 'src/services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductCateogryEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
