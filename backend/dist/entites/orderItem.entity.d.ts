import { OrderEntity } from './order.entity';
import { Product_optionEntity } from './product_option.entity';
export declare class OrderItemEntity {
    orderItem_no: number;
    order_no: OrderEntity;
    user_id: number;
    option_id: Product_optionEntity;
    quantity: number;
    unit_price: number;
    total_price: number;
    review_status: boolean;
    create_at: Date;
}
