import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertOrderDto } from 'src/dto/order.dto';
import { AddressEntity } from 'src/entites/address.entity';
import { CartEntity } from 'src/entites/cart.entity';
import { OrderEntity } from 'src/entites/order.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { UserEntity } from 'src/entites/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async insertOrder(insertOrderDto: InsertOrderDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: insertOrderDto.user_id },
      });
      const address = await this.addressRepository.findOne({
        where: { user_id: user.user_id, default_addr: 'Y' },
      });
      const product = await this.productRepository.findOne({
        where: { product_id: insertOrderDto.product_no },
      });

      if (!user || !address || !product) {
        throw new BadRequestException(
          '정보가 존재하지 않습니다. 다시 확인해 주세요.',
        );
      }

      if (product.stock < insertOrderDto.quantity) {
        throw new BadRequestException('재고가 부족합니다. 다시 확인해 주세요.');
      }

      console.log(product.stock, insertOrderDto.quantity);

      product.stock = product.stock - insertOrderDto.quantity;
      await this.productRepository.update(product.product_id, {
        stock: product.stock,
      });

      insertOrderDto.address_no = address.address_no;
      insertOrderDto.total_price = product.price * insertOrderDto.quantity;

      const orderData = {
        ...insertOrderDto,
        product_no: product,
      };

      console.log(insertOrderDto);

      const result = await this.orderRepository.create(orderData);
      await this.orderRepository.save(result);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async cartOrder() {}
}
