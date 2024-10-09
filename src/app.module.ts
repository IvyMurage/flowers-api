import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlowersModule } from './flowers/flowers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './flowers/entities/flower.entity';
import { APP_FILTER } from '@nestjs/core';
import { PostgresExceptionFilter } from './postgres-exception.filter';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'flowers',
      entities: [Flower, User],
      synchronize: true,
    }),
    FlowersModule,
    UsersModule,
    AuthModule,

  ],
  controllers: [AppController, AuthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PostgresExceptionFilter,
    },
    AppService,
    JwtService,
    UsersService,
    AuthService,
  ],
})
export class AppModule {}
