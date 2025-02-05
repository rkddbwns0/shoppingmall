import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  review_no: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_no' })
  product_no: number;

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
}
