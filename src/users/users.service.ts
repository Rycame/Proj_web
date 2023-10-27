import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { assert } from 'console';

const users: User[] = [
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
        const newUser = new User(lastname, firstname, age);
        users.push(newUser);
        return newUser;
    }

    getAll(): User[] {
        return users;
    }

    getById(id: number): User | undefined {
        return users.find(user => user.id === id);
    }

    update(id: number, lastname?: string, firstname?: string, age?: number): User | undefined {
        const user = this.getById(id);
        if (user) {
            if (lastname !== undefined) user.lastname = lastname;
            if (firstname !== undefined) user.firstname = firstname;
            if (age !== undefined) user.age = age;
        }
        return user;
    }

    delete(id: number): boolean {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        }
        return false;
    }
}
