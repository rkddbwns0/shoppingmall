import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { ReviewEntity } from './review.entity';

@Entity('helpful_review')
@Unique(['review_no', 'user_id', 'product_no'])
export class Helpful_ReviewEntity {
  @PrimaryColumn({ type: 'int', nullable: false })
  review_no: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_no' })
  product_no: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  press_at: Date;

  @ManyToOne(() => ReviewEntity, (review) => review.review_no)
  @JoinColumn({ name: 'review_no' })
  review: number;
}
