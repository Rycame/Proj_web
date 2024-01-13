import { Injectable } from '@nestjs/common';
import { Association } from './associations.entity';
import { User } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';

@Injectable()
export class AssociationsService {
    
    constructor(
        @InjectRepository(Association)
        private associationRepository: Repository<Association>,
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

    async getMembers(associationId: number): Promise<User[]> {
        const association = await this.getById(associationId);
        const members = association.users;
        return members.filter(user => user !== undefined);
    }
}
