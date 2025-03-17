import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';
import { Product_optionEntity } from './product_option.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  orderItem_no: number;

  @ManyToOne(() => OrderEntity, (order) => order.order_no, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_no' })
  order_no: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Product_optionEntity, (product_option) => product_option.option_id)
  @JoinColumn({ name: 'option_id' })
  option_id: Product_optionEntity[];

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  unit_price: number;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @Column({ type: 'enum', enum: ['O', 'X'], default: 'X' })
  review_status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
