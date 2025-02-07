import { ProductCateogryEntity } from './product_categories.entity';
import { CartEntity } from './cart.entity';
import { OrderItemEntity } from './orderItem.entity';
import { OrderEntity } from './order.entity';
import { ReviewEntity } from './review.entity';
import { QnAEntity } from './qna.entity';
import { Helpful_ReviewEntity } from './helpful_review.entity';
import { Like_ProductEntity } from './like_product.entity';
export declare class ProductEntity {
    product_id: number;
    product_category: ProductCateogryEntity;
    product_name: string;
    product_content: string;
    gender: string;
    size: string;
    color: string;
    price: number;
    sale_price: number;
    stock: number;
    reg_at: Date;
    update_at: Date;
    cart: CartEntity[];
    order: OrderEntity[];
    orderItem: OrderItemEntity[];
    review: ReviewEntity;
    qna: QnAEntity[];
    like_product: Like_ProductEntity;
    helpful_review: Helpful_ReviewEntity;
}
