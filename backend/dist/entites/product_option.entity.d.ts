import { ProductEntity } from './product.entity';
import { OrderItemEntity } from './orderItem.entity';
import { CartEntity } from './cart.entity';
import { ReviewEntity } from './review.entity';
import { QnAEntity } from './qna.entity';
export declare class Product_optionEntity {
    option_id: number;
    product_no: ProductEntity;
    color: string;
    size: string;
    stock: number;
    reg_at: Date;
    update_at: Date;
    orderItem: OrderItemEntity[];
    cart: CartEntity[];
    qna: QnAEntity[];
    review: ReviewEntity;
}
