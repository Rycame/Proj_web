import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { assert } from 'console';

export const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23
    }
];

@Injectable()
export class UsersService {

    create(lastname: string, firstname: string, age: number): User {
        const user = new User(lastname, firstname, age);
        users.push(user);
        return user;
    }

    getAll(): User[] {
        if (users.length === 0) {
            throw new HttpException('No user found',HttpStatus.NOT_FOUND)
        }
        return users;
    }

    getById(id: number): User{
        
        return users.find(user => user.id === id);
    }

    update(id: number, lastname?: string, firstname?: string, age?: number): User {
        if (id === undefined) {
            throw new HttpException('Could not find the user with the id ${id}',HttpStatus.NOT_FOUND);
        }
        const user = this.getById(id);
        if (user) {
            if (lastname !== undefined) {
                user.lastname = lastname;
            }
            if (firstname !== undefined) {
                user.firstname = firstname;
            }
            if (age !== undefined) {
                user.age = age;
            }

        }
        return user;
    }

    delete(id: number): boolean {
        if (id === undefined) {
            throw new HttpException('Could not find the user with the id ${id}',HttpStatus.NOT_FOUND);
        }
        users.splice(id, 1);
        if (users[id] !== undefined) {
            return false;
        }
        return true;
    }
}
