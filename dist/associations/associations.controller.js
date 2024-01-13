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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationsController = void 0;
const common_1 = require("@nestjs/common");
const associations_service_1 = require("./associations.service");
const associations_entity_1 = require("./associations.entity");
const swagger_1 = require("@nestjs/swagger");
let AssociationsController = class AssociationsController {
    constructor(associationsService) {
        this.associationsService = associationsService;
    }
    async getAll() {
        return this.associationsService.getAll();
    }
    async getById(id) {
        const association = await this.associationsService.getById(id);
        if (!association) {
            throw new common_1.NotFoundException(`Association with ID ${id} not found`);
        }
        return association;
    }
    async create(associationData) {
        return this.associationsService.create(associationData);
    }
    async update(id, body) {
        return this.associationsService.update(id, body.name);
    }
    async delete(id) {
        await this.associationsService.delete(id);
        return { success: true };
    }
    async getMembers(associationId) {
        return this.associationsService.getMembers(associationId);
    }
};
exports.AssociationsController = AssociationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all associations' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of all associations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an association by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Association ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The found association record' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Association not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new association' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The association has been successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_entity_1.Association]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing association' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Association ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The association has been successfully updated.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Association not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an association' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Association ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The association has been successfully deleted.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Association not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, swagger_1.ApiOperation)({ summary: 'Get members of an association' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Association ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of association members' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Association not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMembers", null);
exports.AssociationsController = AssociationsController = __decorate([
    (0, swagger_1.ApiTags)('associations'),
    (0, common_1.Controller)('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], AssociationsController);
//# sourceMappingURL=associations.controller.js.map