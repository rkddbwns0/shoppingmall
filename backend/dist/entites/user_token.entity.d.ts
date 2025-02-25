import { Timestamp } from 'typeorm';
export declare class UserTokenEntity {
    token_id: number;
    user_id: number;
    token: string;
    expires_at: Timestamp;
}
