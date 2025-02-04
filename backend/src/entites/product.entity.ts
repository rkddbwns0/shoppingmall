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

  @Column({ type: 'varchar', nullable: false })
  size: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: true })
  sale_price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  reg_at: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

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
}
