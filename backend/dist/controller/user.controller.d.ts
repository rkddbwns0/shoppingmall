import { Response } from 'express';
import { SignUpUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    duplicateUser(body: {
        email?: string;
        phone?: string;
        nickname?: string;
    }, res: Response): Promise<void>;
    signup(signupUserDto: SignUpUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
