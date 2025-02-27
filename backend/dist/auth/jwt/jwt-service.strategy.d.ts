import { ConfigService } from '@nestjs/config';
declare const JwtServiceStrategy_base: new (...args: any[]) => any;
export declare class JwtServiceStrategy extends JwtServiceStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        user_id: any;
        email: any;
        name: any;
    }>;
}
export {};
