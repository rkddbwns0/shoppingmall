import { DeleteCartDto, InsertCartDto, UpdateCartDto } from 'src/dto/cart.dto';
import { CartEntity } from 'src/entites/cart.entity';
import { Repository } from 'typeorm';
export declare class CartService {
    private readonly cartRepository;
    constructor(cartRepository: Repository<CartEntity>);
    selectCart(user_id: number): Promise<{
        success: boolean;
        result: CartEntity[];
        message?: undefined;
    } | {
        message: string;
        success?: undefined;
        result?: undefined;
    }>;
    insertCart(insertCartDto: InsertCartDto): Promise<{
        success: boolean;
    }>;
    DeleteCart(deleteCartDto: DeleteCartDto): Promise<{
        success: boolean;
    }>;
    UdpateCart(updateCartDto: UpdateCartDto): Promise<{
        success: boolean;
    }>;
}
