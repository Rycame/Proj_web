import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';
import { User } from '../users/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(private readonly associationsService: AssociationsService) {}

    @Get()
    async getAll(): Promise<Association[]> {
        return this.associationsService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Association> {
        const association = await this.associationsService.getById(id);
        if (!association) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }
        return association;
    }

    @Post()
    async create(@Body() associationData: Association): Promise<Association> {
        return this.associationsService.create(associationData);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: { name: string }): Promise<Association> {
        return this.associationsService.update(id, body.name);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{ success: boolean }> {
        await this.associationsService.delete(id);
        return { success: true };
    }

    @Get(':id/members')
    async getMembers(@Param('id') associationId: number): Promise<User[]> {
        return this.associationsService.getMembers(associationId);
    }
}
