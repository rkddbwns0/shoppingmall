import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { Product_optionEntity } from './product_option.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Product_optionEntity, (product_option) => product_option.option_id)
  @JoinColumn({ name: 'option_id' })
  option_id: Product_optionEntity;

  @Column({ type: 'int', default: 1, nullable: false })
  quantity: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
