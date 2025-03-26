import { Response } from 'express';
import { InsertQnADto } from 'src/dto/qna.dto';
import { QnAService } from 'src/services/qna.service';
export declare class QnAController {
    private readonly qnaService;
    constructor(qnaService: QnAService);
    insertQnA(insertQnADto: InsertQnADto, res: Response): Promise<void>;
    selectQnA(product_no: number, res: Response): Promise<void>;
    myQnA(user_id: number, res: Response): Promise<void>;
}
