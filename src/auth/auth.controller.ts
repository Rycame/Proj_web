import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request) {
      return this.authService.login(request.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() request) {
      return request.user;
    }
}
