import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { users } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    getAll(): User[] {
        return this.service.getAll();
    }

    @Get(':id')
    getById(@Param('id') id : number): User {
        if (users[id] === undefined) {
            throw new HttpException('Could not find the user with the id ${id}',HttpStatus.NOT_FOUND);
        }
        return this.service.getById(id);
    }

    @Post()
    create(@Body() input: { lastname: string, firstname: string, age: number }): User {
        return this.service.create(input.lastname, input.firstname, input.age);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() input: { lastname?: string, firstname?: string, age?: number }
    ): User {
        if (users[id] === undefined) {
            throw new HttpException('Could not find the user with the id ${id}',HttpStatus.NOT_FOUND);
        }
        return this.service.update(id, input.lastname, input.firstname, input.age);
    }

    @Delete(':id')
    delete(@Param('id') id: number): { success: boolean } {
        if (users[id] === undefined) {
            throw new HttpException('Could not find the user with the id ${id}',HttpStatus.NOT_FOUND);
        }
        return { success: this.service.delete(id) };
    }
    
}

