import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { MinutesModule } from './minutes/minutes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Association } from './associations/associations.entity';
import { Minute } from './minutes/minute.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [User, Association, Minute],
      synchronize: true,
    }),
    UsersModule,
    AssociationsModule,
    MinutesModule,
    AuthModule,
  , RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
