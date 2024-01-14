import { Injectable, NotFoundException } from '@nestjs/common';
import { Association } from './associations.entity';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { AssociationDTO } from './association.dto';
import { Member } from './association.member';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AssociationsService {
    
    constructor(
        @InjectRepository(Association)
        private associationRepository: Repository<Association>,
        private rolesService: RolesService,
    ) {}

    async create(associationData: Association): Promise<AssociationDTO> {
        const newAssociation = this.associationRepository.create(associationData);
        await this.associationRepository.save(newAssociation);
        return this.toDTO(newAssociation);
    }

    async getAll(): Promise<AssociationDTO[]> {
        const associations = await this.associationRepository.find({relations: ['users']});
        return Promise.all(associations.map(association => this.toDTO(association)));
    }
    

    async getById(idToFind: number): Promise<AssociationDTO> {
        const association = await this.associationRepository.findOne({ where: {id: idToFind}, relations: ['users']});
        return this.toDTO(association);
    }

    async update(id: number, name: string): Promise<AssociationDTO> {
        let association = await this.getById(id);
        association.name = name;
        await this.associationRepository.save(association);
        return association;
    }

    async delete(id: number): Promise<void> {
        await this.associationRepository.delete(id);
    }

    async getMembers(associationId: number): Promise<Member[]> {
        const associationDTO = await this.getById(associationId);
        if (!associationDTO) {
            throw new NotFoundException(`Association with ID ${associationId} not found`);
        }
        return associationDTO.members;
    }
    
    

    private async toDTO(association: Association): Promise<AssociationDTO> {
        const memberPromises = association.users.map(user => 
          this.userToMember(user, association.id)
        );
      
        const members = await Promise.all(memberPromises);
      
        return {
          id: association.id,
          name: association.name,
          members: members,
        };
    }

    private async userToMember(user: User, associationId: number): Promise<Member> {
        const role = await this.rolesService.getByIds(user.id, associationId);
        return {
            userId: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            role: role.name
        };
    }
}