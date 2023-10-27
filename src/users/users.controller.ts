import { Controller, Body, Post, Param, Get  } from '@nestjs/common';
import { User } from './user.entity';

const users : User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John'
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
    

create(@Body() input: any): User {
    const newUser = new User(input.lastname, input.firstname);
    users.push(newUser);
    return newUser;
}

}

