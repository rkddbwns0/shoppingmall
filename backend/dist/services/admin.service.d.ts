import { AdminLoginDto, CreateAdminDto } from 'src/dto/admin.dto';
import { AdminEntity } from 'src/entites/admin.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private readonly admin;
    constructor(admin: Repository<AdminEntity>);
    duplicateEmail(email: string): Promise<void>;
    hashPassword(password: string): Promise<string>;
    createAdmin(createAdminDto: CreateAdminDto): Promise<{
        success: boolean;
    }>;
    adminLogin(adminLogin: AdminLoginDto): Promise<{
        login_success: boolean;
    }>;
}
