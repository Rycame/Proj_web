import { Injectable } from '@nestjs/common';

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23
    }
]

@Injectable()
export class UsersService {}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {}
