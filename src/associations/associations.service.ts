import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { Association } from './association.entity';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { AssociationDTO } from './association.dto';
import { Member } from './association.member';
import { RolesService } from '../roles/roles.service';
import { Minute } from 'src/minutes/minute.entity';
import { MinutesService } from 'src/minutes/minutes.service';

@Injectable()
export class AssociationsService {
    
    constructor(
        @InjectRepository(Association)
        private associationRepository: Repository<Association>,
        @Inject(forwardRef(() => RolesService))
        private rolesService: RolesService,
        @Inject(forwardRef(() => MinutesService))
        private minutesService: MinutesService
    ) {}

    async create(associationData: Association): Promise<Association> {
        const newAssociation = this.associationRepository.create(associationData);
        await this.associationRepository.save(newAssociation);
        return newAssociation;
    }

    async getAll(): Promise<Association[]> {
        return this.associationRepository.find({relations: ['users']});
    }

    async getById(idToFind: number): Promise<Association> {
        const association = await this.associationRepository.findOne({ where: {id: Equal(idToFind)}, relations: ['users']});
        return association;
    }

    async update(id: number, name: string): Promise<Association> {
        let association = await this.getById(id);
        association.name = name;
        await this.associationRepository.save(association);
        return association;
    }

    async delete(id: number): Promise<void> {
        await this.associationRepository.delete(id);
    }

    async getMembers(associationId: number): Promise<Member[]> {
        const associationDTO = await this.toDTO(await this.getById(associationId));
        return associationDTO.members;
    }
    

    async toDTO(association: Association): Promise<AssociationDTO> {
        if (!association.users) {
            return {
              id: association.id,
              name: association.name,
              members: []
            };
          }

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

    async userToMember(user: User, associationId: number): Promise<Member> {
        const role = await this.rolesService.getByIds(user.id, associationId);
        return {
            userId: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            role: role.name
        };
    }






    async getMinutesByAssociationId(associationId: number, sort: 'ASC' | 'DESC' = 'ASC'): Promise<Minute[]> {
        return this.minutesService.findMinutesByAssociationId(associationId, sort);
      }
      
}