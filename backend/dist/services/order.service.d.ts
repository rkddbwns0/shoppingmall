import { CartOrderDto, InsertOrderDto, RefundOrderDto } from 'src/dto/order.dto';
import { AddressEntity } from 'src/entites/address.entity';
import { AdminEntity } from 'src/entites/admin.entity';
import { CartEntity } from 'src/entites/cart.entity';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderItemEntity } from 'src/entites/orderItem.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { Product_optionEntity } from 'src/entites/product_option.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class OrderService {
    private readonly orderRepository;
    private readonly userRepository;
    private readonly cartRepository;
    private readonly productRepository;
    private readonly product_optionRepository;
    private readonly addressRepository;
    private readonly orderItemsRepository;
    private readonly adminRepository;
    constructor(orderRepository: Repository<OrderEntity>, userRepository: Repository<UserEntity>, cartRepository: Repository<CartEntity>, productRepository: Repository<ProductEntity>, product_optionRepository: Repository<Product_optionEntity>, addressRepository: Repository<AddressEntity>, orderItemsRepository: Repository<OrderItemEntity>, adminRepository: Repository<AdminEntity>);
    orderList(user_id: number): Promise<OrderEntity[]>;
    insertOrder(insertOrderDto: InsertOrderDto): Promise<{
        success: boolean;
    }>;
    cartOrder(cartOrderDto: CartOrderDto): Promise<{
        success: boolean;
    }>;
    refundOrder(refundOrderDto: RefundOrderDto): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
    }>;
    private checkOrderState;
}
