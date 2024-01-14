import { Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { User } from 'src/users/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(roleInput: RoleInput): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({
      where: {
        idUser: roleInput.idUser,
        idAssociation: roleInput.idAssociation
      }
    });
  
    if (existingRole) {
      return existingRole;
    }
    const newRole = this.roleRepository.create(roleInput);
    await this.roleRepository.save(newRole);
    return newRole;
  }

  async getAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getByIds(idUser: number, idAssociation: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        idUser: idUser,
        idAssociation: idAssociation
      }
    });
  
    if (!role) {
      throw new NotFoundException(`Role with User ID ${idUser} and Association ID ${idAssociation} not found`);
    }
  
    return role;
  }
  

  async update(idUser: number, idAssociation: number, roleUpdate: RoleUpdate): Promise<Role> {
    const role = await this.getByIds(idUser, idAssociation);
    Object.assign(role, roleUpdate);
    return this.roleRepository.save(role);
  }
  

  async delete(idUser: number, idAssociation: number): Promise<void> {
    const result = await this.roleRepository.delete({ idUser, idAssociation });
    if (result.affected === 0) {
      throw new NotFoundException(`Role with user ID ${idUser} and association ID ${idAssociation} not found`);
    }
  }




  async findRolesByUserId(userId: number): Promise<Role[]> {
    const roles = await this.roleRepository.find({
      where: { idUser: userId },
      relations: ['user', 'association']
    });
    if (!roles) {
      throw new NotFoundException(`No roles found for user with ID ${userId}`);
    }
    return roles;
  }
  
  async getUsersByRoleName(roleName: string): Promise<User[]> {
    const users = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.user', 'user')
      .where('role.name = :roleName', { roleName })
      .select(['user.id', 'user.firstname', 'user.lastname', 'user.age', 'user.password'])
      .getMany();
    return users.map(role => role.user);
  }
  
  
}
