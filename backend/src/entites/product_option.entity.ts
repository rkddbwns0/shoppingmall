import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderItemEntity } from './orderItem.entity';
import { CartEntity } from './cart.entity';
import { ReviewEntity } from './review.entity';
import { QnAEntity } from './qna.entity';

@Entity('product_option')
export class Product_optionEntity {
  @PrimaryGeneratedColumn()
  option_id: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_no' })
  product_no: ProductEntity;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({
    type: 'enum',
    enum: ['XS(85)', 'S(90)', 'M(95)', 'L(100)', 'XL(105)', 'XXL(110)'],
  })
  size: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock: number;

  @Column({ type: 'datetime', default: 'CURRENT_TIMESTAMP' })
  reg_at: Date;

  @Column({ type: 'int', onUpdate: 'CURRENT_TIMESTAMP' })
  update_at: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.option_id)
  orderItem: OrderItemEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.option_id)
  cart: CartEntity[];

  @OneToMany(() => QnAEntity, (qna) => qna.option_id)
  qna: QnAEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.option_id)
  review: ReviewEntity;
}
