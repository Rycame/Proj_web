import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiBody, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary: 'Authenticate user and return JWT' })
    @ApiOkResponse({ description: 'User successfully authenticated, JWT provided' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBody({ 
        description: 'User Credentials', 
        schema: { 
            example: { username: 'user1', password: 'password123' }
        } 
    })
    async login(@Request() request) {
      return this.authService.login(request.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    @ApiOperation({ summary: 'Get the profile of the authenticated user' })
    @ApiOkResponse({ description: 'Profile retrieved successfully' })
    @ApiNotFoundResponse({ description: 'Profile not found' })
    getProfile(@Request() request) {
      return request.user;
    }
}
