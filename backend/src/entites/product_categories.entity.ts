import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_categories')
export class ProductCateogryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToOne(() => ProductCateogryEntity, (category) => category.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent_id: ProductCateogryEntity;

  @OneToMany(() => ProductCateogryEntity, (category) => category.parent_id)
  children: ProductCateogryEntity[];

  @OneToMany(() => ProductEntity, (category) => category.product_category)
  product_category: ProductEntity[];
}
