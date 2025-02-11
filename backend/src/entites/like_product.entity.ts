import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity('like_product')
export class Like_ProductEntity {
  @PrimaryColumn({ type: 'int', nullable: false })
  product_no: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  like_at: Date;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_no' })
  product: number;
}
