import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
export declare class OrderItemEntity {
    orderItem_no: number;
    order_no: OrderEntity;
    user_id: UserEntity;
    product_id: ProductEntity;
    quantity: number;
    unit_price: number;
    total_price: number;
    create_at: Date;
}
