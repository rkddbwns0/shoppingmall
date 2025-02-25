import { CartEntity } from './cart.entity';
import { AddressEntity } from './address.entity';
import { OrderItemEntity } from './orderItem.entity';
import { OrderEntity } from './order.entity';
import { ReviewEntity } from './review.entity';
import { QnAEntity } from './qna.entity';
import { Helpful_ReviewEntity } from './helpful_review.entity';
import { Like_ProductEntity } from './like_product.entity';
import { UserTokenEntity } from './user_token.entity';
export declare class UserEntity {
    user_id: number;
    name: string;
    phone: string;
    email: string;
    password: string;
    nickname: string;
    create_at: Date;
    update_at: Date;
    user_token: UserTokenEntity;
    cart: CartEntity[];
    address: AddressEntity[];
    order: OrderEntity[];
    orderItem: OrderItemEntity[];
    review: ReviewEntity;
    qna: QnAEntity;
    like_product: Like_ProductEntity;
    helpful_review: Helpful_ReviewEntity;
}
