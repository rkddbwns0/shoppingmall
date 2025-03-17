import { Product_optionEntity } from './product_option.entity';
export declare class CartEntity {
    cart_id: number;
    user_id: number;
    option_id: Product_optionEntity;
    quantity: number;
    create_at: Date;
}
