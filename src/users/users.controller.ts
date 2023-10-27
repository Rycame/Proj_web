import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
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
    update(@Param() parameter, @Body() input: any): User {
        if(users[parameter.id] === undefined){
            throw new HttpException('Could not find a user with the id ${parameter.id}', HttpStatus.NOT_FOUND)
        }
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
    update(
        @Param('id') id: number,
        @Body() userDto: { lastname?: string, firstname?: string, age?: number }
    ): User | undefined {
        return this.userService.update(id, userDto.lastname, userDto.firstname, userDto.age);
    }

    @Delete(':id')
    delete(@Param() parameter): boolean {
        if(users[parameter.id] === undefined){
            throw new HttpException('Could not find a user with the id ${parameter.id}', HttpStatus.NOT_FOUND)
        }
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

