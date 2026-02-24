import { Body, Controller, Get, HttpCode, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from 'src/app/user-profiles/users/dto/create-user.dto';
import { User } from 'src/app/user-profiles/users/entities/user.entity';
import { UserResponseDto } from 'src/app/user-profiles/users/dto/user-response.dto';
import { AuthLoginInputDto } from './dto/auth-login-input.dto';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signUp')
  //   @HttpCode(201)
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; User: UserResponseDto }> {
    return await this.authenticationService.signUp(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() authLoginInput: AuthLoginInputDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    // return await this.authenticationService.login(authLoginInput);
    const { accessToken, refreshToken, user } =
    await this.authenticationService.login(authLoginInput);

  // نحط الريفريش في HttpOnly Cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // false =>  true في production (HTTPS)
    sameSite: 'strict',
    path:'/api/token/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  return {
    accessToken,
    user,
  };
  }

  @Patch('resetPassword')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authenticationService.resetPassword(body);
  }

  // redirect to Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport handles redirect
  }

  //callback from Google
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req,
@Res({ passthrough: true }) res: Response) {
    // return this.authenticationService.googleLogin(req.user);
    const { accessToken, refreshToken, user } =
    await this.authenticationService.googleLogin(req.user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/api/token/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    accessToken,
    user,
  };
  }
}
