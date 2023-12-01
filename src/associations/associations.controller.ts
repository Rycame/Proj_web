import { Controller, Get, Param } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { User } from '../users/user.entity';

@Controller('associations')
export class AssociationsController {
    constructor(private readonly associationsService: AssociationsService) {}

    // ... vos autres endpoints

    @Get(':id/members')
    getMembers(@Param('id') id: number): User[] {
        return this.associationsService.getMembers(id);
    }
}
