import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LogoutDto } from 'src/dto/auth.dto';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import { UserTokenEntity } from 'src/entites/user_token.entity';
export declare class AuthService {
    private readonly user;
    private readonly user_token;
    private readonly jwtService;
    private readonly configService;
    constructor(user: Repository<UserEntity>, user_token: Repository<UserTokenEntity>, jwtService: JwtService, configService: ConfigService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user_info: {
            email: string;
            name: string;
        };
    }>;
    vaildateServiceUser(loginDto: LoginDto): Promise<UserEntity>;
    accessTokenService(user: UserEntity): Promise<string>;
    refreshTokenService(user: UserEntity): Promise<string>;
    logout(logoutDto: LogoutDto): Promise<void>;
}
