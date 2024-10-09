import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlowersModule } from './flowers/flowers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './flowers/entities/flower.entity';
import { APP_FILTER } from '@nestjs/core';
import { PostgresExceptionFilter } from './postgres-exception.filter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'flowers',
      entities: [Flower],
      synchronize: true,
    }),
    FlowersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PostgresExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
