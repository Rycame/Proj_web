import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBody } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiCreatedResponse({ description: 'The role has been successfully created.' })
  @ApiBody({ type: RoleInput })
  async create(@Body() roleInput: RoleInput) {
    return this.rolesService.create(roleInput);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ description: 'List of all roles' })
  async findAll() {
    return this.rolesService.getAll();
  }

  @Get('/any/:idUser/:idAssociation')
  @ApiOperation({ summary: 'Get a specific role' })
  @ApiOkResponse({ description: 'The role data' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async findOne(@Param('idUser') idUser: number, @Param('idAssociation') idAssociation: number) {
    return this.rolesService.getByIds(idUser, idAssociation);
  }
  

  @Put(':idUser/:idAssociation')
  @ApiOperation({ summary: 'Update a specific role' })
  @ApiOkResponse({ description: 'The role has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async update(
      @Param('idUser') idUser: number, 
      @Param('idAssociation') idAssociation: number, 
      @Body() roleUpdate: RoleUpdate
  ) {
      return this.rolesService.update(idUser, idAssociation, roleUpdate);
  }
  

  @Delete(':idUser/:idAssociation')
  @ApiOperation({ summary: 'Delete a specific role' })
  @ApiOkResponse({ description: 'The role has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async remove(
      @Param('idUser') idUser: number, 
      @Param('idAssociation') idAssociation: number
  ) {
      return this.rolesService.delete(idUser, idAssociation);
  }
  

  @Get('/users/:name')
  async getUsersByRoleName(@Param('name') roleName: string): Promise<User[]> {
    return this.rolesService.getUsersByRoleName(roleName);
  }
  


}
