import { CartOrderDto, InsertOrderDto } from 'src/dto/order.dto';
import { AddressEntity } from 'src/entites/address.entity';
import { CartEntity } from 'src/entites/cart.entity';
import { OrderEntity } from 'src/entites/order.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class OrderService {
    private readonly orderRepository;
    private readonly userRepository;
    private readonly cartRepository;
    private readonly productRepository;
    private readonly addressRepository;
    constructor(orderRepository: Repository<OrderEntity>, userRepository: Repository<UserEntity>, cartRepository: Repository<CartEntity>, productRepository: Repository<ProductEntity>, addressRepository: Repository<AddressEntity>);
    insertOrder(insertOrderDto: InsertOrderDto): Promise<{
        success: boolean;
    }>;
    cartOrder(cartOrderDto: CartOrderDto): Promise<{
        success: boolean;
    }>;
}
