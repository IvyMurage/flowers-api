import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser({name, password}: AuthDto): Promise<any>{
        const user = await this.userService.findByUsername(name)
        if(user && user.validatePassword(password)){
            const { password, ...result} = user
            return result
        }
        throw new BadRequestException('Invalid name or password')   
    }

    async signIn(user: AuthDto){
        const payload = this.validateUser(user)
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async signUp(user: CreateUserDto){
        const userExists = await  this.userService.findByUsername(user.name)
        if(!userExists) throw new UnauthorizedException('user already exists')
        return await this.userService.createUser(user.name, user.password, user.role = 'user')
    }
}
