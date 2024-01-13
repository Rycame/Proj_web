import { User } from './users.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(lastname: string, firstname: string, age: number, password: string): Promise<User>;
    getAll(): Promise<User[]>;
    getById(idToFind: number): Promise<User>;
    update(id: number, updateData: User): Promise<User>;
    delete(id: number): Promise<void>;
}
