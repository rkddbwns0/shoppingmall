import { DeleteAddressDto, InsertAddressDto, UpdateAddressDto } from 'src/dto/address.dto';
import { AddressEntity } from 'src/entites/address.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class AddressService {
    private readonly addressRepository;
    private readonly userRepository;
    constructor(addressRepository: Repository<AddressEntity>, userRepository: Repository<UserEntity>);
    selectAddress(user_id: number): Promise<AddressEntity[]>;
    insertAddress(insertAddressDto: InsertAddressDto): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    private handleDefaultAddr;
    private changeDefaultAdrr;
    private saveDefaultAddress;
    updateDefaultAddress(updateAddressDto: UpdateAddressDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAddress(deleteAddressDto: DeleteAddressDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
