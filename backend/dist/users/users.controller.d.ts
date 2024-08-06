import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    create(userData: User): Promise<User>;
    update(id: number, updateData: User): Promise<User>;
    delete(id: number): Promise<{
        success: boolean;
    }>;
}
