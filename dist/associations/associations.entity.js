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
exports.Association = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const swagger_1 = require("@nestjs/swagger");
let Association = class Association {
};
exports.Association = Association;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the association',
        example: 1,
        type: Number,
    }),
    __metadata("design:type", Number)
], Association.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of the association',
        example: "Computer Science Class",
        type: String,
    }),
    __metadata("design:type", String)
], Association.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => users_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    (0, swagger_1.ApiProperty)({
        description: 'List of users associated with this association',
        example: '[{ "id": 1, "firstname": "John", "lastname": "Doe", "age": 28 }, { "id": 2, "firstname": "Jane", "lastname": "Doe", "age": 25 }]',
        type: 'array',
        isArray: true
    }),
    __metadata("design:type", Array)
], Association.prototype, "users", void 0);
exports.Association = Association = __decorate([
    (0, typeorm_1.Entity)()
], Association);
//# sourceMappingURL=associations.entity.js.map