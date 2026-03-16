import { UsersService } from './users.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../../database/entities/User.entity").User[]>;
    create(createUserDto: CreateUserDto): Promise<import("../../database/entities/User.entity").User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
