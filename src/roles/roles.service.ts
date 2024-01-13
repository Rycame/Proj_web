import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(roleInput: RoleInput): Promise<Role> {
    const newRole = this.roleRepository.create(roleInput);
    return this.roleRepository.save(newRole);
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getRoleByIds(idUser: number, idAssociation: number): Promise<Role> {
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
  

  async updateRole(idUser: number, idAssociation: number, roleUpdate: RoleUpdate): Promise<Role> {
    const role = await this.getRoleByIds(idUser, idAssociation);
    Object.assign(role, roleUpdate);
    return this.roleRepository.save(role);
  }
  

  async deleteRole(idUser: number, idAssociation: number): Promise<void> {
    const result = await this.roleRepository.delete({ idUser, idAssociation });
    if (result.affected === 0) {
      throw new NotFoundException(`Role with user ID ${idUser} and association ID ${idAssociation} not found`);
    }
  }
  
}
