import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  orderItem_no: number;

  @ManyToOne(() => OrderEntity, (order) => order.order_no)
  @JoinColumn({ name: 'order_no' })
  order_no: OrderEntity;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_id' })
  product_id: ProductEntity;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  unit_price: number;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
