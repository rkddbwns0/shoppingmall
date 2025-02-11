import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entites/admin.entity';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderMngController } from '../controller/order_mng.controller';
import { OrderMngService } from '../services/order_mng.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, OrderEntity])],
  controllers: [OrderMngController],
  providers: [OrderMngService],
})
export class OrderMngModule {}
