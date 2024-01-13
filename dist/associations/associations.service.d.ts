import { Association } from './associations.entity';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
export declare class AssociationsService {
    private associationRepository;
    constructor(associationRepository: Repository<Association>);
    create(associationData: Association): Promise<Association>;
    getAll(): Promise<Association[]>;
    getById(idToFind: number): Promise<Association>;
    update(id: number, name: string): Promise<Association>;
    delete(id: number): Promise<void>;
    getMembers(associationId: number): Promise<User[]>;
}
