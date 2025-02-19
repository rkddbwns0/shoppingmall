import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from 'src/controller/order.controller';
import { AddressEntity } from 'src/entites/address.entity';
import { AdminEntity } from 'src/entites/admin.entity';
import { CartEntity } from 'src/entites/cart.entity';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderItemEntity } from 'src/entites/orderItem.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { Product_optionEntity } from 'src/entites/product_option.entity';
import { UserEntity } from 'src/entites/user.entity';
import { OrderService } from 'src/services/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      AddressEntity,
      UserEntity,
      CartEntity,
      ProductEntity,
      OrderItemEntity,
      AdminEntity,
      Product_optionEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
