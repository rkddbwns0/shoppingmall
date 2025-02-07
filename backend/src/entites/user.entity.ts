import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
import { AddressEntity } from './address.entity';
import { OrderItemEntity } from './orderItem.entity';
import { OrderEntity } from './order.entity';
import { ReviewEntity } from './review.entity';
import { QnAEntity } from './qna.entity';
import { Helpful_ReviewEntity } from './helpful_review.entity';
import { Like_ProductEntity } from './like_product.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false, default: UserEntity.name })
  nickname: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @Column({ type: 'datetime', nullable: true })
  update_at: Date;

  @OneToMany(() => CartEntity, (cart) => cart.user_id)
  cart: CartEntity[];

  @OneToMany(() => AddressEntity, (address) => address.user_id)
  address: AddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user_id)
  order: OrderEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.user_id)
  orderItem: OrderItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user_id)
  review: ReviewEntity;

  @OneToMany(() => QnAEntity, (qna) => qna.user_id)
  qna: QnAEntity;

  @OneToMany(() => Like_ProductEntity, (like_product) => like_product.user_id)
  like_product: Like_ProductEntity;

  @OneToMany(
    () => Helpful_ReviewEntity,
    (helpful_review) => helpful_review.user_id,
  )
  helpful_review: Helpful_ReviewEntity;
}
