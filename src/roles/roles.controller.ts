import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiCreatedResponse({ description: 'The role has been successfully created.' })
  @ApiBody({ type: RoleInput })
  async create(@Body() roleInput: RoleInput) {
    return this.rolesService.createRole(roleInput);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ description: 'List of all roles' })
  async findAll() {
    return this.rolesService.getAllRoles();
  }

  @Get(':idUser/:idAssociation')
  @ApiOperation({ summary: 'Get a specific role' })
  @ApiOkResponse({ description: 'The role data' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async findOne(@Param('idUser') idUser: number, @Param('idAssociation') idAssociation: number) {
    return this.rolesService.getRoleByIds(idUser, idAssociation);
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
      return this.rolesService.updateRole(idUser, idAssociation, roleUpdate);
  }
  

  @Delete(':idUser/:idAssociation')
  @ApiOperation({ summary: 'Delete a specific role' })
  @ApiOkResponse({ description: 'The role has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async remove(
      @Param('idUser') idUser: number, 
      @Param('idAssociation') idAssociation: number
  ) {
      return this.rolesService.deleteRole(idUser, idAssociation);
  }
  
}
