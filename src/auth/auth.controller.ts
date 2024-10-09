import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}
    @Post('login')
    async login(@Body() authPayload: AuthDto){
        return await this.authService.signIn(authPayload)
    }


    @Post('register')
    async register(@Body() signupPayload: AuthDto ){
        return await this.authService.signUp({...signupPayload, role:'user'})
    }
}
