import { Request, Response } from 'express';
import { LoginDto, LogoutDto } from 'src/dto/auth.dto';
import { SignUpUserDto } from 'src/dto/user.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    duplicateUser(body: {
        email?: string;
        phone?: string;
    }, res: Response): Promise<void>;
    signup(signupUserDto: SignUpUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, req: Request, res: Response): Promise<void>;
    getProfile(req: any): Promise<{
        email: any;
        name: any;
    }>;
    logout(res: Response, logoutDto: LogoutDto, req: Request): Promise<{
        message: string;
    }>;
}
