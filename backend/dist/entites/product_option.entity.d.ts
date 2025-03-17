import { OrderItemEntity } from './orderItem.entity';
import { CartEntity } from './cart.entity';
import { ReviewEntity } from './review.entity';
export declare class Product_optionEntity {
    option_id: number;
    product_no: number;
    color: string;
    size: string;
    stock: number;
    price: number;
    sale_price: number;
    reg_at: Date;
    update_at: Date;
    orderItem: OrderItemEntity[];
    cart: CartEntity[];
    review: ReviewEntity;
}
