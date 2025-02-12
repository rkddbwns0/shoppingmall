import { SignUpUserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly user;
    constructor(user: Repository<UserEntity>);
    checkDuplicate(email?: string, phone?: string, nickname?: string): Promise<{
        email?: string;
        phone?: string;
        nickname?: string;
    } | {
        message: any;
    }>;
    private checkEmail;
    private checkPhone;
    private checkNickname;
    hashPassword(password: string): Promise<string>;
    signupUser(signupUserDto: SignUpUserDto): Promise<{
        suceess: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: any;
        suceess?: undefined;
    }>;
}
