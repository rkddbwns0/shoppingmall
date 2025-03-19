import { Product_optionEntity } from '../entites/product_option.entity';
export declare class InsertCartDto {
    user_id: number;
    option_id: Product_optionEntity;
    quantity: number;
}
export declare class DeleteCartDto {
    cart_id: number;
    user_id: number;
}
export declare class UpdateCartDto {
    cart_id: number;
    quantity: number;
}
