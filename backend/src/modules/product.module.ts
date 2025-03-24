import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { ProductController } from 'src/controller/product.controller';
import { ProductEntity } from 'src/entites/product.entity';
import { ProductCateogryEntity } from 'src/entites/product_categories.entity';
import { Product_optionEntity } from 'src/entites/product_option.entity';
import { ProductService } from 'src/services/product.service';
import { UserTokenEntity } from '../entites/user_token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductCateogryEntity,
      Product_optionEntity,
      UserTokenEntity
    ]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 600,
      isGlobal: true,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
