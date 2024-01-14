import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';
import { User } from '../users/user.entity';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(private readonly associationsService: AssociationsService) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve all associations' })
    @ApiOkResponse({ description: 'List of all associations' })
    async getAll(): Promise<Association[]> {
        return this.associationsService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an association by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Association ID' })
    @ApiOkResponse({ description: 'The found association record' })
    @ApiNotFoundResponse({ description: 'Association not found' })
    async getById(@Param('id') id: number): Promise<Association> {
        const association = await this.associationsService.getById(id);
        if (!association) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        return association;
    }

    @Post()
    @ApiOperation({ summary: 'Create a new association' })
    @ApiCreatedResponse({ description: 'The association has been successfully created.' })
    async create(@Body() associationData: Association): Promise<Association> {
        return this.associationsService.create(associationData);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing association' })
    @ApiParam({ name: 'id', type: 'number', description: 'Association ID' })
    @ApiOkResponse({ description: 'The association has been successfully updated.' })
    @ApiNotFoundResponse({ description: 'Association not found' })
    async update(@Param('id') id: number, @Body() body: { name: string }): Promise<Association> {
        return this.associationsService.update(id, body.name);
    }
    
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an association' })
    @ApiParam({ name: 'id', type: 'number', description: 'Association ID' })
    @ApiOkResponse({ description: 'The association has been successfully deleted.' })
    @ApiNotFoundResponse({ description: 'Association not found' })
    async delete(@Param('id') id: number): Promise<{ success: boolean }> {
        await this.associationsService.delete(id);
        return { success: true };
    }
    
    @Get(':id/members')
    @ApiOperation({ summary: 'Get members of an association' })
    @ApiParam({ name: 'id', type: 'number', description: 'Association ID' })
    @ApiOkResponse({ description: 'List of association members' })
    @ApiNotFoundResponse({ description: 'Association not found' })
    async getMembers(@Param('id') associationId: number): Promise<User[]> {
        return this.associationsService.getMembers(associationId);
    }
}
