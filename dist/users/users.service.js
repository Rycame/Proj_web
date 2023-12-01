"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = exports.users = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
exports.users = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23
    }
];
let UsersService = class UsersService {
    create(lastname, firstname, age) {
        const user = new user_entity_1.User(lastname, firstname, age);
        exports.users.push(user);
        return user;
    }
    getAll() {
        return exports.users;
    }
    getById(id) {
        return exports.users.find(user => user.id === id);
    }
    update(id, lastname, firstname, age) {
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
    delete(id) {
        exports.users.splice(id, 1);
        if (exports.users[id] !== undefined) {
            return false;
        }
        return true;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map