import { ProductEntity } from './product.entity';
export declare class CartEntity {
    cart_id: number;
    user_id: number;
    product_id: ProductEntity;
    quantity: number;
    create_at: Date;
}
