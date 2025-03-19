import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CartOrderDto,
  InsertOrderDto,
  RefundOrderDto,
} from 'src/dto/order.dto';
import { AddressEntity } from 'src/entites/address.entity';
import { AdminEntity } from 'src/entites/admin.entity';
import { CartEntity } from 'src/entites/cart.entity';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderItemEntity } from 'src/entites/orderItem.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { Product_optionEntity } from 'src/entites/product_option.entity';
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

    @InjectRepository(Product_optionEntity)
    private readonly product_optionRepository: Repository<Product_optionEntity>,

    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemsRepository: Repository<OrderItemEntity>,

    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async orderList(user_id: number) {
    try {
      const order = await this.orderRepository.find({
        where: { user_id: user_id },
        order: { order_at: 'DESC' },
      });
      return order;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async insertOrder(insertOrderDto: InsertOrderDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: insertOrderDto.user_id },
      });
      const address = await this.addressRepository.findOne({
        where: { user_id: user.user_id, default_addr: 'Y' },
      });
      const product = await  this.productRepository.findOne({where: {product_id: insertOrderDto.product_no}, select: ['price']})
      const product_option = await this.product_optionRepository.findOne({
        where: { option_id: insertOrderDto.option_id, product_no: {product_id: insertOrderDto.product_no}},
      })

      if (!user || !address || !product_option) {
        throw new BadRequestException(
          '정보가 존재하지 않습니다. 다시 확인해 주세요.',
        );
      }

      if (product_option.stock < insertOrderDto.quantity) {
        throw new BadRequestException('재고가 부족합니다. 다시 확인해 주세요.');
      }

      product_option.stock = product_option.stock - insertOrderDto.quantity;
      await this.product_optionRepository.update(product_option.option_id, {
        stock: product_option.stock,
      });

      insertOrderDto.address_no = address.address_no;
      insertOrderDto.total_price = product.price * insertOrderDto.quantity;

      const orderData = {
        ...insertOrderDto,
        product_no: [product],
      };

      const result = this.orderRepository.create(orderData);
      const saveResult = await this.orderRepository.save(result);
      const orderItems = {
        user_id: user.user_id,
        order_no: saveResult.order_no,
        option_id: product_option,
        quantity: insertOrderDto.quantity,
        unit_price: product.price,
        total_price: insertOrderDto.total_price,
      };

      console.log(orderItems);

      const saveItems = this.orderItemsRepository.create(orderItems)
      await this.orderItemsRepository.save(saveItems);

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

      const address = await this.addressRepository.findOne({
        where: { user_id: user.user_id, default_addr: 'Y' },
      });

      const cart_product = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoin('product_option', 'product_option', 'product_option.option_id = cart.option_id')
        .leftJoin('product', 'product', 'product.product_id = product_option.product_no')
        .where('cart.user_id = :user_id', { user_id: cartOrderDto.user_id })
        .select([
          'cart',
          'product_option',
          'product.price'
        ])
        .groupBy('cart.option_id')
        .getRawMany()

      const product_nos = cart_product.map(
        (cartItem) => cartItem.cart_option_id
      );

      const product_data = await this.product_optionRepository.find({
        where: { option_id: In(product_nos) },
      });

      if (!user || !cart_product || !product_data) {
        throw new BadRequestException('정보가 없습니다.');
      }

      let total_price = 0;
      let total_quantity = 0;
      const product_items = [];

      cart_product.forEach((cartItem) => {
        const product_option = product_data.find(
          (product_option) => product_option.option_id === cartItem.cart_option_id,
        );
        if (product_option) {
            total_price += cartItem.product_price * cartItem.cart_quantity;
            total_quantity += cartItem.cart_quantity;
            product_items.push({
              option_id: product_option.option_id,
              unit_price: cartItem.cart_quantity * cartItem.product_price,
              quantity: cartItem.cart_quantity,
            });
        }
        console.log(cartItem)
      });

      cartOrderDto.address_no = address.address_no;

      const cartOrder_data = {
        ...cartOrderDto,
        product_no: product_data,
        quantity: total_quantity,
        total_price: total_price,
      };

      const result = this.orderRepository.create(cartOrder_data);
      const saveResult = await this.orderRepository.save(result);

      const orderItems = product_items.map((item) => ({
        ...item,
        user_id: user.user_id,
        order_no: saveResult.order_no,
        total_price: total_price,
      }));
      console.log(orderItems);

      const saveItems = this.orderItemsRepository.create(orderItems);
      await this.orderItemsRepository.save(saveItems);

      await Promise.all(
        cart_product.map(async (cartItem) => {
          const product_option = product_data.find(
            (product_option) => product_option.option_id === cartItem.cart_option_id,
          );
          if (product_option) {
            const updateStock = product_option.stock - cartItem.cart_quantity;
            if (updateStock < 0) {
              throw new BadRequestException(
                '현재 재고가 부족합니다. 다시 확인해 주세요.',
              );
            }
            await this.product_optionRepository.update(
              { option_id: product_option.option_id },
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

  async refundOrder(refundOrderDto: RefundOrderDto) {
    try {
      await this.checkOrderState(refundOrderDto.order_no);

      const findOrderItems = await this.orderItemsRepository.find({
        where: {
          order_no: refundOrderDto.order_no,
        },
        relations: ['product_no'],
      });

      refundOrderDto.order_state = '환불 진행 중';
      const result = await this.orderRepository.save(refundOrderDto);
      Promise.all(
        findOrderItems.map(async (item) => {
          const product = item.option_id;
          const order_quantity = item.quantity;

          // product.stock += order_quantity;

          await this.productRepository.save(product);
        }),
      );

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }

  private async checkOrderState(order_no: number) {
    try {
      const orderState = await this.orderRepository.findOne({
        where: { order_no: order_no },
        select: ['order_state'],
      });

      if (
        orderState.order_state === '환불 진행 중' ||
        orderState.order_state === '환불 완료'
      ) {
        throw new BadRequestException('이미 환불 처리된 주문입니다.');
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
