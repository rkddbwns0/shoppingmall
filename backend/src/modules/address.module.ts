import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from 'src/controller/address.controller';
import { AddressEntity } from 'src/entites/address.entity';
import { UserEntity } from 'src/entites/user.entity';
import { AddressService } from 'src/services/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
