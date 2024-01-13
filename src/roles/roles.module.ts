import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]), // Registre le repository Role pour l'injection
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}