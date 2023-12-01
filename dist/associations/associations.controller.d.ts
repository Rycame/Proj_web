import { AssociationsService } from './associations.service';
import { User } from '../users/user.entity';
export declare class AssociationsController {
    private readonly associationsService;
    constructor(associationsService: AssociationsService);
    getMembers(id: number): User[];
}
