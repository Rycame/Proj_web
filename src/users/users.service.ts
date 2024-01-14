import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.entity';



@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(forwardRef(() => RolesService))
        private rolesService: RolesService
    ) {}

    async create(lastname: string, firstname: string, age: number, password: string): Promise<User> {
        const saltRounds = 10;
        if (password===undefined) {
            password = "0000";
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = this.userRepository.create({firstname: firstname, lastname: lastname, age: age, password: hashedPassword});
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

        if (updateData.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
            updateData.password = hashedPassword;
        }

        Object.assign(user, updateData);

        await this.userRepository.save(user);

        return user;
    }
    
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    } 





    async getRolesByUserId(userId: number): Promise<Role[]> {
        const roles = await this.rolesService.findRolesByUserId(userId);
        return roles;
      }
    
}
