import { Response } from 'express';
import { CartOrderDto, InsertOrderDto, RefundOrderDto } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    orderList(user_id: number, res: Response): Promise<void>;
    insertOrder(insertOrderDto: InsertOrderDto, res: Response): Promise<Response<any, Record<string, any>>>;
    cartOrder(cartOrderDto: CartOrderDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refundOrder(refundOrderDto: RefundOrderDto, res: Response): Promise<void>;
}
