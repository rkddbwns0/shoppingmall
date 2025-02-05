import { QnA_AnswerEntity } from './qna_answer.entity';
export declare class AdminEntity {
    admin_id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    create_at: Date;
    update_at: Date;
    qna_answer: QnA_AnswerEntity;
}
