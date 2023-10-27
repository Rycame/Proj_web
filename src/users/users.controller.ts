import { Controller, Body, Post, Param, Get, Put, Delete } from '@nestjs/common';
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

    //Delete qui return un boolean en fonction de si l'utilisateur a été supprimé ou non

    //Il NE faut PAS utiliser la fonction delete, par exemple en faisant delete users[id]. 
    //La fonction delete remplace la valeur par undefined, et ne retire pas complétement l'élément du tableau.
    @Delete(':id')
    delete(@Param() parameter): boolean {
        assert(users[parameter.id], 'User not found');
        users.splice(parameter.id, 1);
        if (users[parameter.id] !== undefined) {
            return false;
        }
        return true;
    }



create(@Body() input: any): User {
    const newUser = new User(input.lastname, input.firstname, input.age);
    users.push(newUser);
    return newUser;
}

    
}

