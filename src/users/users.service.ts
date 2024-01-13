import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { assert } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';



@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    

    async create(lastname: string, firstname: string, age: number): Promise<User> {
        const user = this.userRepository.create({firstname: firstname, lastname: lastname, age: age});
        await this.userRepository.save(user);
        return user;
    }
    
    
    async getAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    public async getById(idToFind: number): Promise<User> {
        return this.userRepository.findOne({ where: {id: Equal(idToFind)}});
    }
    

    async update(id: number, updateData: User): Promise<User> {
        const user = await this.getById(id);
        Object.assign(user, updateData);
        await this.userRepository.save(user);
        return user;
    }
    

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
    
}
