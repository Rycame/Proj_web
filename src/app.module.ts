import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsController } from './associations/associations.controller';
import { AssociationsService } from './associations/associations.service';
import { AssociationsModule } from './associations/associations.module';

@Module({
  imports: [TypeOrmModule.forRoot({type: 'sqlite',
    database: 'mydatabase.db',
    entities: [],
    synchronize: true,}),UsersModule, AssociationsModule],
  controllers: [AppController, AssociationsController],
  providers: [AppService, AssociationsService],
})
export class AppModule {}
