import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/user-profiles/users/entities/user.entity';
import { OtpCodesModule } from '../otp-codes/otp-codes.module';
import { I18n_Module } from 'src/i18n/i18n.module';
import { JwtService } from '@nestjs/jwt';
import { OtpCode } from '../otp-codes/entities/otp-code.entity';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    TypeOrmModule.forFeature([User, OtpCode]),
    OtpCodesModule,
    I18n_Module,
  ],
  providers: [AuthenticationService, JwtService, GoogleStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
