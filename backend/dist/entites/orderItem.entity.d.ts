import { Product_optionEntity } from './product_option.entity';
export declare class OrderItemEntity {
    orderItem_no: number;
    order_no: number;
    user_id: number;
    option_id: Product_optionEntity[];
    quantity: number;
    unit_price: number;
    total_price: number;
    review_status: string;
    create_at: Date;
}
