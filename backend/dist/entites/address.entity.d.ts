import { OrderEntity } from './order.entity';
export declare class AddressEntity {
    address_no: number;
    user_id: number;
    name: string;
    zip_code: string;
    address: string;
    detail_addr: string;
    req: string;
    default_addr: string;
    order: OrderEntity[];
}
