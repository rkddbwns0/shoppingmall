import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartOrderDto, InsertOrderDto } from 'src/dto/order.dto';
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

      product.stock = product.stock - insertOrderDto.quantity;
      await this.productRepository.update(product.product_id, {
        stock: product.stock,
      });

      insertOrderDto.address_no = address.address_no;
      insertOrderDto.total_price = product.price * insertOrderDto.quantity;

      const orderData = {
        ...insertOrderDto,
        product_no: [product],
      };

      const result = await this.orderRepository.create(orderData);
      await this.orderRepository.save(result);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async cartOrder(cartOrderDto: CartOrderDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: cartOrderDto.user_id },
      });

      const cart_product = await this.cartRepository.find({
        where: { user_id: user.user_id },
        relations: ['product_id'],
      });

      const product_nos = cart_product.map(
        (cartItem) => cartItem.product_id.product_id,
      );

      const product_data = await this.productRepository.find({
        where: { product_id: In(product_nos) },
      });

      if (!user || !cart_product || !product_data) {
        throw new BadRequestException('정보가 없습니다.');
      }

      let total_price = 0;
      let total_quantity = 0;

      cart_product.forEach((cartItem) => {
        const product = product_data.find(
          (product) => product.product_id === cartItem.product_id.product_id,
        );
        if (product) {
          total_price += product.price * cartItem.quantity;
          total_quantity += cartItem.quantity;
        }
      });

      const cartOrder_data = {
        ...cartOrderDto,
        product_no: product_data,
        quantity: total_quantity,
        total_price: total_price,
      };

      const result = await this.orderRepository.create(cartOrder_data);
      await this.orderRepository.save(result);

      await Promise.all(
        cart_product.map(async (cartItem) => {
          const product = product_data.find(
            (product) => product.product_id === cartItem.product_id.product_id,
          );
          if (product) {
            const updateStock = product.stock - cartItem.quantity;
            if (updateStock < 0) {
              throw new BadRequestException(
                '현재 재고가 부족합니다. 다시 확인해 주세요.',
              );
            }

            await this.productRepository.update(
              { product_id: product.product_id },
              { stock: updateStock },
            );
          }
        }),
      );

      await this.cartRepository.delete({ user_id: user.user_id });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
