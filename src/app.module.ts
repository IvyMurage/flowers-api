import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlowersModule } from './flowers/flowers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './flowers/entities/flower.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
