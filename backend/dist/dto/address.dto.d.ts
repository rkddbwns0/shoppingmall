export declare class InsertAddressDto {
    user_id: number;
    name: string;
    zip_code: string;
    addr: string;
    detail_addr: string;
    req: string;
    default_addr: string;
}
export declare class UpdateAddressDto {
    address_no: number;
    user_id: number;
    default_addr: string;
}
export declare class DeleteAddressDto {
    address_no: number;
    user_id: number;
}
