import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { AddressEntity } from './address.entity';
import { OrderItemEntity } from './orderItem.entity';

// 테이블 테이터
/*
1. 주문 번호
2. 유저 아이디 고유넘버
3. 상품 넘버 -> 배열 형식으로 상품 넘버 여러 개 가져오도록 하기(장바구니 내역 구매 시)
4. 수량
5. 주문 현황 ['주문 완료', '배송중', '배송 완료', '환불 진행 중', '환불 완료']
6. 환불 사유
7. 배송지 (address 테이블에 지정된 no값을 가져와서 저장하여 해당 정보를 가져오기)
8. 결제 방식
9. 총 가격
10. 결제일
*/
@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  order_no: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToMany(() => ProductEntity, (product) => product.order)
  @JoinTable({ name: 'product_no' })
  product_no: ProductEntity;

  @Column({ type: 'int', default: 1, nullable: false })
  quantity: number;

  @Column({
    type: 'enum',
    enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
    default: '주문 완료',
  })
  order_state: string;

  @Column({ type: 'varchar', nullable: true })
  refund_reason: string;

  @ManyToOne(() => AddressEntity, (address) => address.address_no)
  @JoinColumn({ name: 'address_no' })
  address_no: number;

  @Column({ type: 'varchar', nullable: false })
  payment_method: string;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  order_at: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order_no)
  orderItem: OrderItemEntity[];
}
