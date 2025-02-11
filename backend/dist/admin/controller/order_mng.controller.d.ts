import { OrderMngService } from '../services/order_mng.service';
import { OrderMngDto } from '../dto/order_mng.dto';
import { Response } from 'express';
export declare class OrderMngController {
    private readonly orderMngService;
    constructor(orderMngService: OrderMngService);
    successRefund(orderMngDto: OrderMngDto, res: Response): Promise<void>;
}
