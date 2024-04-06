import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleAuthGuard } from './google.auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { Role } from '../role/role.model';
import { Request } from './interfaces/request.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Login to your account' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async login(@Body() user: LoginDTO) {
    return this.authService.login(user);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'Registration new account' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  registration(@Body() userDto: LoginDTO) {
    return this.authService.registration(userDto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google-auth')
  @ApiOperation({ summary: 'Google OAuth authorization' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async googleAuth(@Req() req: Request) {
    // The GoogleAuthGuard will handle the authorization and redirect the user to the callback URL
  }

  @Get('/google-redirect')
  @ApiOperation({ summary: 'Google OAuth redirect' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async googleRedirect(@Req() req: Request) {
    const user = req.user;
    const jwt = this.authService.login(user);
    return jwt;
  }
}
