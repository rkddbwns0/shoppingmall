import { ConfigService } from '@nestjs/config';
declare const JwtServiceStrategy_base: new (...args: any[]) => any;
export declare class JwtServiceStrategy extends JwtServiceStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    vaildate(payload: any): Promise<{
        email: any;
        name: any;
        nickname: any;
    }>;
}
export {};
