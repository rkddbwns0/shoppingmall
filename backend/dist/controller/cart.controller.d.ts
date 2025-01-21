import { Response } from 'express';
import { DeleteCartDto, InsertCartDto, UpdateCartDto } from 'src/dto/cart.dto';
import { CartService } from 'src/services/cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    selectCart(user_id: number, res: Response): Promise<void>;
    insertCart(insertCartDto: InsertCartDto, res: Response): Promise<void>;
    deleteCart(deleteCartDto: DeleteCartDto, res: Response): Promise<void>;
    updateCart(updateCartDto: UpdateCartDto, res: Response): Promise<void>;
}
