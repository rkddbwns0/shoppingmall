import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from 'src/admin/controller/admin.controller';
import { AdminEntity } from 'src/entites/admin.entity';
import { AdminService } from 'src/admin/services/admin.service';
import { OrderEntity } from 'src/entites/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, OrderEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
