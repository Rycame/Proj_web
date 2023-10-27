import { Controller } from '@nestjs/common';

export class User {
    id: number;
    lastname: string;
    firstname: string;

    constructor(lastname: string, firstname: string) {
        this.lastname = lastname;
        this.firstname = firstname;
    }
}