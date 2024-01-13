import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserInput } from './user-input';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    create(input: UserInput): Promise<User>;
    update(id: number, updateData: User): Promise<User>;
    delete(id: number): Promise<{
        success: boolean;
    }>;
}
