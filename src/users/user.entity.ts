import { Controller } from '@nestjs/common';

export class User {
    id: number;
    lastname: string;
    firstname: string;
    public age: number;

    constructor(lastname: string, firstname: string, age: 23) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
    }
}