import { Response } from 'express';
import { AdminLoginDto, CreateAdminDto } from 'src/dto/admin.dto';
import { AdminService } from 'src/services/admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createAdmin(createAdminDto: CreateAdminDto, res: Response): Promise<void>;
    adminLogin(adminLoginDto: AdminLoginDto, res: Response): Promise<void>;
}
