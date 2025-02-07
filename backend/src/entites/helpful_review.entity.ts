import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { ReviewEntity } from './review.entity';

@Entity('helpful_review')
export class Helpful_ReviewEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_no' })
  product_no: number;

  @ManyToOne(() => ReviewEntity, (review) => review.review_no)
  @JoinColumn({ name: 'review_no' })
  review_no: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
