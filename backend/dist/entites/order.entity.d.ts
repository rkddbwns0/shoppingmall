import { ProductEntity } from './product.entity';
import { OrderItemEntity } from './orderItem.entity';
export declare class OrderEntity {
    order_no: number;
    user_id: number;
    product_no: ProductEntity;
    quantity: number;
    order_state: string;
    refund_reason: string;
    address_no: number;
    payment_method: string;
    total_price: number;
    order_at: Date;
    orderItem: OrderItemEntity[];
}
