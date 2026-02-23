import { Body, Controller, Get, HttpCode, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from 'src/app/user-profiles/users/dto/create-user.dto';
import { User } from 'src/app/user-profiles/users/entities/user.entity';
import { UserResponseDto } from 'src/app/user-profiles/users/dto/user-response.dto';
import { AuthLoginInputDto } from './dto/auth-login-input.dto';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';

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
  ): Promise<AuthLoginResponseDto> {
    return await this.authenticationService.login(authLoginInput);
  }

  @Patch('resetPassword')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authenticationService.resetPassword(body);
  }

  //redirect to Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport handles redirect
  }

  //callback from Google
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    return this.authenticationService.googleLogin(req.user);
  }
}
