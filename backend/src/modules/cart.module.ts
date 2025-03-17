import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from 'src/controller/cart.controller';
import { CartEntity } from 'src/entites/cart.entity';
import { CartService } from 'src/services/cart.service';
import { Product_optionEntity } from '../entites/product_option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, Product_optionEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
