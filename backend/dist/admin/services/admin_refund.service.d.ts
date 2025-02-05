import { SuccessRefundDto } from 'src/admin/dto/admin.dto';
import { AdminEntity } from 'src/entites/admin.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/entites/order.entity';
export declare class AdminService {
    private readonly admin;
    private readonly orderRepository;
    constructor(admin: Repository<AdminEntity>, orderRepository: Repository<OrderEntity>);
    successRefund(successRefundDto: SuccessRefundDto): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
    }>;
}
