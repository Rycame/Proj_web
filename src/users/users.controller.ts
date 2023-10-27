import { Controller, Body, Post, Param, Get, Put } from '@nestjs/common';
import { User } from './user.entity';
import { assert } from 'console';

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23
    }
]
@Controller('users')
export class UsersController {

    @Post()

    @Get('')
    getAll(): User[] {
        return users;
    }

    @Get(':id')
    getById(@Param() parameter): User {
        return users[parameter.id];
    }

    @Put(':id')
    update(@Param() parameter, @Body() input: any): User {
        assert(users[parameter.id], 'User not found');
        const user = users[parameter.id];
        if (input.lastname !== undefined) {
            user.lastname = input.lastname;
        }

        if (input.firstname !== undefined) 
        {
            user.firstname = input.firstname;
        }
        return user;
    }


create(@Body() input: any): User {
    const newUser = new User(input.lastname, input.firstname, input.age);
    users.push(newUser);
    return newUser;
}

}

