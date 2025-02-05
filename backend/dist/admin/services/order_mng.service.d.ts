import { AdminEntity } from 'src/entites/admin.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/entites/order.entity';
import { OrderMngDto } from '../dto/order_mng.dto';
export declare class OrderMngService {
    private readonly admin;
    private readonly orderRepository;
    constructor(admin: Repository<AdminEntity>, orderRepository: Repository<OrderEntity>);
    checkAdmin(admin_id: number): Promise<{
        check: boolean;
        message?: undefined;
    } | {
        check: boolean;
        message: any;
    }>;
    orderMng(orderMngDto: OrderMngDto): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
    }>;
}
