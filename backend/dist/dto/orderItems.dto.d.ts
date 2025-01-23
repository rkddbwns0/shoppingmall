import { ProductEntity } from 'src/entites/product.entity';
export declare class OrderItemsDto {
    user_id: number;
    order_no: number;
    product_no: ProductEntity;
    quantity: number;
    unit_price: number;
    total_price: number;
}
