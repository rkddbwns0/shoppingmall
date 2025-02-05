import { AdminLoginDto, CreateAdminDto } from 'src/admin/dto/admin.dto';
import { AdminEntity } from 'src/entites/admin.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/entites/order.entity';
export declare class AdminService {
    private readonly admin;
    private readonly orderRepository;
    constructor(admin: Repository<AdminEntity>, orderRepository: Repository<OrderEntity>);
    duplicateEmail(email: string): Promise<void>;
    hashPassword(password: string): Promise<string>;
    createAdmin(createAdminDto: CreateAdminDto): Promise<{
        success: boolean;
    }>;
    adminLogin(adminLogin: AdminLoginDto): Promise<{
        login_success: boolean;
    }>;
}
