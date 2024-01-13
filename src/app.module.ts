import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { MinutesModule } from './minutes/minutes.module';  // Importez le module des Minutes
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Association } from './associations/associations.entity';
import { Minute } from './minutes/minute.entity';  // Importez l'entité Minute
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [User, Association, Minute],  // Ajoutez Minute à la liste des entités
      synchronize: true,
    }),
    UsersModule,
    AssociationsModule,
    MinutesModule,  // Ajoutez le module des Minutes
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
