import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCateogryEntity } from './product_categories.entity';
import { CartEntity } from './cart.entity';
import { OrderItemEntity } from './orderItem.entity';
import { OrderEntity } from './order.entity';
import { ReviewEntity } from './review.entity';
import { QnAEntity } from './qna.entity';
import { Helpful_ReviewEntity } from './helpful_review.entity';
import { Like_ProductEntity } from './like_product.entity';
import { Product_optionEntity } from './product_option.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @ManyToOne(() => ProductCateogryEntity, (cateogry) => cateogry.category_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_category' })
  product_category: ProductCateogryEntity;

  @Column({ type: 'varchar', nullable: false })
  product_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  })
  product_content: string;

  @Column({ type: 'enum', enum: ['남성', '여성', '남녀공용'], nullable: false })
  gender: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  reg_at: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @OneToMany(
    () => Product_optionEntity,
    (product_option) => product_option.product_no,
  )
  product_option: Product_optionEntity;

  @OneToMany(() => CartEntity, (cart) => cart.product_id)
  cart: CartEntity[];

  @ManyToMany(() => OrderEntity, (order) => order.product_no)
  @JoinColumn({ name: 'order_no' })
  order: OrderEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product_no)
  orderItem: OrderItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product_no)
  review: ReviewEntity;

  @OneToMany(() => QnAEntity, (qna) => qna.product_no)
  qna: QnAEntity[];

  @OneToMany(
    () => Like_ProductEntity,
    (like_product) => like_product.product_no,
  )
  like_product: Like_ProductEntity;

  @OneToMany(
    () => Helpful_ReviewEntity,
    (helpful_review) => helpful_review.product_no,
  )
  helpful_review: Helpful_ReviewEntity;
}
