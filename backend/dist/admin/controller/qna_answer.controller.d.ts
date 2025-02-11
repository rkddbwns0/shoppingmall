import { QnA_AnswerService } from '../services/qna_answer.service';
import { Response } from 'express';
import { QnA_AnswerDto } from '../dto/qna_answer.dto';
export declare class QnA_AdminController {
    private readonly qna_answerService;
    constructor(qna_answerService: QnA_AnswerService);
    all_qna(res: Response): Promise<void>;
    select_qna(qna_no: number, res: Response): Promise<void>;
    qna_answer(qna_answerDto: QnA_AnswerDto, res: Response): Promise<void>;
}
