import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinutesController } from './minutes.controller';
import { MinutesService } from './minutes.service';
import { Minute } from './minute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Minute])],
  controllers: [MinutesController],
  providers: [MinutesService],
  exports: [MinutesService],
})
export class MinutesModule {}
