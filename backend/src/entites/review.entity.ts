import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
import { Helpful_ReviewEntity } from './helpful_review.entity';
import { Product_optionEntity } from './product_option.entity';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  review_no: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_no' })
  product_no: number;

  @ManyToOne(() => Product_optionEntity, (product_option) => product_option.option_id)
  @JoinColumn({ name: 'option_id' })
  option_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    length: 1000,
  })
  contents: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: false })
  scope: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  write_at: Date;

  @OneToMany(
    () => Helpful_ReviewEntity,
    (helpful_review) => helpful_review.review_no,
  )
  helpful_review: Helpful_ReviewEntity[];
}
