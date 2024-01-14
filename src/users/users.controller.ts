import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiCreatedResponse, ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserInput } from './user-input';
import { Role } from 'src/roles/roles.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve all users' })
    @ApiOkResponse({ description: 'List of all users' })
    async getAll(): Promise<User[]> {
        return this.service.getAll();
    }
    

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiOkResponse({ description: 'The found user record' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async getById(@Param('id') id: number): Promise<User> {
        const user = await this.service.getById(id);
        if (!user) {
            throw new NotFoundException(`Could not find the user with the id ${id}`);
        }
        return user;
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({ description: 'The user has been successfully created.' })
    async create(@Body() input: UserInput): Promise<User> {
        return this.service.create(input.lastname, input.firstname, input.age, input.password);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiOkResponse({ description: 'The user has been successfully updated.' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async update(@Param('id') id: number, @Body() updateData: User): Promise<User> {
        const updatedUser = await this.service.update(id, updateData);
        if (!updatedUser) {
            throw new NotFoundException(`Could not find the user with the id ${id}`);
        }
        return updatedUser;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiOkResponse({ description: 'The user has been successfully deleted.' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async delete(@Param('id') id: number): Promise<{ success: boolean }> {
        await this.service.delete(id);
        return { success: true };
    }


    @Get(':id/roles')
    async getUserRoles(@Param('id') userId: number): Promise<Role[]> {
      return this.service.getRolesByUserId(userId);
    }
    
}
