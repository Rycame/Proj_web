import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { Association } from './association.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
    controllers: [AssociationsController],
    providers: [AssociationsService],
    imports: [TypeOrmModule.forFeature([Association]), forwardRef(() => RolesModule)],
    exports: [AssociationsService]
})
export class AssociationsModule {}
