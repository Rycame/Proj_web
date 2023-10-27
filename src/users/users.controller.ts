import { Controller,Body, Post, Get  } from '@nestjs/common';
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

    /*
        @Get('all')
        getAll(): string[] {
            return ['a','b','c','d','e'];
        }
    */
@Post()
/*
    créer une nouvelle instance de User (la syntaxe "à la Java" fonctionne : new User(param1, param2))
    ajouter cette nouvelle instance à notre "base de données", qui est le tableau de User, i.e. const users : User[], les tableaux en typescript peuvent être vus comme des List en Java, et la fonction push permet d'ajouter un élément (.e.g users.push(newUser))
    retourner cette nouvelle instance au client
*/
create(@Body() input: any): User {
    const newUser = new User(input.lastname, input.firstname);
    users.push(newUser);
    return newUser;
}

}

