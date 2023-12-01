import { User } from './user.entity';
export declare const users: User[];
export declare class UsersService {
    create(lastname: string, firstname: string, age: number): User;
    getAll(): User[];
    getById(id: number): User;
    update(id: number, lastname?: string, firstname?: string, age?: number): User;
    delete(id: number): boolean;
}
