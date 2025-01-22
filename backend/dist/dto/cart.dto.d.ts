import { ProductEntity } from 'src/entites/product.entity';
export declare class InsertCartDto {
    user_id: number;
    product_id: ProductEntity;
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
