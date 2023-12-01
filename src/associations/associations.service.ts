import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Association } from './associations.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AssociationsService {
    private associations: Association[] = [
        // Exemple d'association
        new Association(1, [1, 2, 3], 'Association Example')
    ];

    constructor(private service: UsersService) {}

    create(idUsers: number[], name: string): Association {
        const newAssociation = new Association(
            this.associations.length + 1, // Génération simple d'un ID
            idUsers,
            name
        );
        this.associations.push(newAssociation);
        return newAssociation;
    }

    getAll(): Association[] {
        return this.associations;
    }

    getById(id: number): Association | undefined {
        return this.associations.find(assoc => assoc.id === id);
    }

    update(id: number, idUsers: number[], name: string): Association | undefined {
        const association = this.getById(id);
        if (association) {
            association.idUsers = idUsers;
            association.name = name;
            return association;
        }
        return undefined;
    }

    delete(id: number): boolean {
        const index = this.associations.findIndex(assoc => assoc.id === id);
        if (index !== -1) {
            this.associations.splice(index, 1);
            return true;
        }
        return false;
    }

    getMembers(associationId: number): User[] {
        const association = this.associations.find(assoc => assoc.id === associationId);
        if (!association) {
            // Gérer l'absence de l'association, par exemple en renvoyant une liste vide ou une erreur
            return [];
        }
        const memberIds = association.idUsers;
        const members = memberIds.map(id => this.service.getById(id)).filter(user => user !== undefined) as User[];
        return members;
    }
}
