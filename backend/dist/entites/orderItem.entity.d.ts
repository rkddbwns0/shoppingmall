import { ProductEntity } from './product.entity';
export declare class OrderItemEntity {
    orderItem_no: number;
    order_no: number;
    user_id: number;
    product_no: ProductEntity;
    quantity: number;
    unit_price: number;
    total_price: number;
    create_at: Date;
}
