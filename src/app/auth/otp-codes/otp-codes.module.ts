import { Module } from '@nestjs/common';
import { OtpCodesService } from './otp-codes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpCode } from './entities/otp-code.entity';
import { User } from 'src/app/user-profiles/users/entities/user.entity';
import { I18n_Module } from 'src/i18n/i18n.module';
import { OtpCodesController } from './otp-codes.controller';


@Module({
  imports:[
    TypeOrmModule.forFeature([OtpCode,User]),
    I18n_Module
  ],
  providers: [OtpCodesService],
  controllers: [OtpCodesController],
  exports:[OtpCodesService]
})
export class OtpCodesModule {}
