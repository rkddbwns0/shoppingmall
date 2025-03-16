export declare class InsertOrderDto {
    user_id: number;
    option_id: number;
    product_no: number;
    quantity: number;
    order_state: string;
    refund_reason?: string;
    address_no: number;
    payment_method: string;
    total_price: number;
}
export declare class CartOrderDto {
    user_id: number;
    product_no: number[];
    quantity: number;
    order_state: string;
    refund_reason?: string;
    address_no: number;
    payment_method: string;
    total_price: number;
}
export declare class RefundOrderDto {
    user_id: number;
    order_no: number;
    order_state: string;
    refund_reason: string;
}
