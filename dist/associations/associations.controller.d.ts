import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';
import { User } from '../users/users.entity';
export declare class AssociationsController {
    private readonly associationsService;
    constructor(associationsService: AssociationsService);
    getAll(): Promise<Association[]>;
    getById(id: number): Promise<Association>;
    create(associationData: Association): Promise<Association>;
    update(id: number, body: {
        name: string;
    }): Promise<Association>;
    delete(id: number): Promise<{
        success: boolean;
    }>;
    getMembers(associationId: number): Promise<User[]>;
}
