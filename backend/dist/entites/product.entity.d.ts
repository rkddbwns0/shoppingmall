import { ProductCateogryEntity } from './product_categories.entity';
import { OrderEntity } from './order.entity';
import { ReviewEntity } from './review.entity';
import { QnAEntity } from './qna.entity';
import { Helpful_ReviewEntity } from './helpful_review.entity';
import { Like_ProductEntity } from './like_product.entity';
import { Product_optionEntity } from './product_option.entity';
export declare class ProductEntity {
    product_id: number;
    product_category: ProductCateogryEntity;
    product_name: string;
    product_content: string;
    gender: string;
    price: number;
    reg_at: Date;
    update_at: Date;
    product_option: Product_optionEntity;
    order: OrderEntity[];
    review: ReviewEntity;
    qna: QnAEntity[];
    like_product: Like_ProductEntity;
    helpful_review: Helpful_ReviewEntity;
}
