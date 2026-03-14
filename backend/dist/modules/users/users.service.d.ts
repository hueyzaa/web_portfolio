import { Repository } from 'typeorm';
import { User } from '../../database/entities/User.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
