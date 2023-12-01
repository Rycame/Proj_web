import { UsersService } from '../users/users.service';
import { Association } from './associations.entity';
import { User } from '../users/user.entity';
export declare class AssociationsService {
    private service;
    private associations;
    constructor(service: UsersService);
    create(idUsers: number[], name: string): Association;
    getAll(): Association[];
    getById(id: number): Association | undefined;
    update(id: number, idUsers: number[], name: string): Association | undefined;
    delete(id: number): boolean;
    getMembers(associationId: number): User[];
}
