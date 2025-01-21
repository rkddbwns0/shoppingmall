import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  address_no: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  zip_code: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  detail_addr: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: '조심히 안전하게 배송해주세요.',
  })
  req: string;

  @Column({ type: 'enum', enum: ['Y', 'N'], default: 'N' })
  default_addr: string;

  @OneToMany(() => OrderEntity, (order) => order.address_no)
  order: OrderEntity[];
}
