import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    getAll(): User[];
    getById(id: number): User;
    create(input: {
        lastname: string;
        firstname: string;
        age: number;
    }): User;
    update(id: number, input: {
        lastname?: string;
        firstname?: string;
        age?: number;
    }): User;
    delete(id: number): {
        success: boolean;
    };
}
