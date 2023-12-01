import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { Association } from './associations.entity';

@Module({
    controllers: [AssociationsController],
    providers: [AssociationsService],
    imports: [TypeOrmModule.forFeature([Association])],
    exports: [AssociationsService]
})
export class AssociationsModule {}
