import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { UsersModule } from '../users/users.module'; // Assurez-vous que le chemin est correct

@Module({
    controllers: [AssociationsController],
    providers: [AssociationsService],
    imports: [UsersModule] // Ajoutez cette ligne
})
export class AssociationsModule {}
