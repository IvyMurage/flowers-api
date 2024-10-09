import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'yourSecretKey',
            signOptions: { expiresIn: '12h' },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers:[AuthService, UsersService, ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
