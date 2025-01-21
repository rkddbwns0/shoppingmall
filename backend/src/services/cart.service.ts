import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteCartDto, InsertCartDto, UpdateCartDto } from 'src/dto/cart.dto';
import { CartEntity } from 'src/entites/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async selectCart(user_id: number) {
    try {
      const result = await this.cartRepository.find({
        where: { user_id: user_id },
        relations: ['product_id'],
      });
      return { success: true, result: result };
    } catch (error) {
      console.error(error);
      return { message: '없어요' };
    }
  }

  async insertCart(insertCartDto: InsertCartDto) {
    try {
      const findCart = await this.cartRepository.findOne({
        where: insertCartDto,
      });

      if (findCart) {
        const newQuantity = findCart.quantity + insertCartDto.quantity;
        await this.cartRepository.update(findCart.cart_id, {
          quantity: newQuantity,
        });
        return { success: true };
      } else {
        const result = await this.cartRepository.create(insertCartDto);
        await this.cartRepository.save(result);
        return { success: true };
      }
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async DeleteCart(deleteCartDto: DeleteCartDto) {
    try {
      const findCart = await this.cartRepository.findOne({
        where: { cart_id: deleteCartDto.cart_id },
      });

      if (!findCart) {
        throw new BadRequestException('장바구니에 존재하지 않는 제품입니다.');
      }

      const result = await this.cartRepository.delete(deleteCartDto);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async UdpateCart(updateCartDto: UpdateCartDto) {
    try {
      const findCart = await this.cartRepository.findOne({
        where: { cart_id: updateCartDto.cart_id },
      });
      if (!findCart) {
        throw new BadRequestException('장바구니에 해당 제품이 없습니다.');
      }
      await this.cartRepository.update(updateCartDto.cart_id, {
        quantity: updateCartDto.quantity,
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
