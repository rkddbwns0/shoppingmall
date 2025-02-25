import { Request, Response } from 'express';
import { LoginDto } from 'src/dto/auth.dto';
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
        nickname?: string;
    }, res: Response): Promise<void>;
    signup(signupUserDto: SignUpUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response, loginDto: LoginDto): Promise<void>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
