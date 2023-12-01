"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationsService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const associations_entity_1 = require("./associations.entity");
let AssociationsService = class AssociationsService {
    constructor(service) {
        this.service = service;
        this.associations = [
            new associations_entity_1.Association(1, [1, 2, 3], 'Association Example')
        ];
    }
    create(idUsers, name) {
        const newAssociation = new associations_entity_1.Association(this.associations.length + 1, idUsers, name);
        this.associations.push(newAssociation);
        return newAssociation;
    }
    getAll() {
        return this.associations;
    }
    getById(id) {
        return this.associations.find(assoc => assoc.id === id);
    }
    update(id, idUsers, name) {
        const association = this.getById(id);
        if (association) {
            association.idUsers = idUsers;
            association.name = name;
            return association;
        }
        return undefined;
    }
    delete(id) {
        const index = this.associations.findIndex(assoc => assoc.id === id);
        if (index !== -1) {
            this.associations.splice(index, 1);
            return true;
        }
        return false;
    }
    getMembers(associationId) {
        const association = this.associations.find(assoc => assoc.id === associationId);
        if (!association) {
            return [];
        }
        const memberIds = association.idUsers;
        const members = memberIds.map(id => this.service.getById(id)).filter(user => user !== undefined);
        return members;
    }
};
exports.AssociationsService = AssociationsService;
exports.AssociationsService = AssociationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AssociationsService);
//# sourceMappingURL=associations.service.js.map