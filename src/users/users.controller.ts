import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    async getAll(): Promise<User[]> {
        return this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<User> {
        const user = await this.service.getById(id);
        if (!user) {
            throw new NotFoundException(`Could not find the user with the id ${id}`);
        }
        return user;
    }

    @Post()
    async create(@Body() userData: User): Promise<User> {
        return this.service.create(userData);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateData: User
    ): Promise<User> {
        return this.service.update(id, updateData);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{ success: boolean }> {
        await this.service.delete(id);
        return { success: true };
    }
}
