import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getAll(): User[] {
        return this.userService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number): User | undefined {
        return this.userService.getById(id);
    }

    @Post()
    create(@Body() userDto: { lastname: string, firstname: string, age: number }): User {
        return this.userService.create(userDto.lastname, userDto.firstname, userDto.age);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() userDto: { lastname?: string, firstname?: string, age?: number }
    ): User | undefined {
        return this.userService.update(id, userDto.lastname, userDto.firstname, userDto.age);
    }

    @Delete(':id')
    delete(@Param('id') id: number): { success: boolean } {
        return { success: this.userService.delete(id) };
    }
}
