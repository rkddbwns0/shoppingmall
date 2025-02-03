import { Response } from 'express';
import { CartOrderDto, InsertOrderDto, RefundOrderDto, SuccessRefundDto } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    insertOrder(insertOrderDto: InsertOrderDto, res: Response): Promise<Response<any, Record<string, any>>>;
    cartOrder(cartOrderDto: CartOrderDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refundOrder(refundOrderDto: RefundOrderDto, res: Response): Promise<void>;
    successRefund(successRefundDto: SuccessRefundDto, res: Response): Promise<void>;
}
