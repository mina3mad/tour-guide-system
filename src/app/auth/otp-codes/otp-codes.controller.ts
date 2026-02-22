import { Body, Controller, Patch, Post, UsePipes } from '@nestjs/common';
import { OtpCodesService } from './otp-codes.service';
import { OtpCodeType } from './enum/otp-code-type.enum';
import { ResendOtpCodeDto } from './dto/resend-otp.dto';
import { CustomI18nService } from 'src/i18n/i18n.service';

@Controller('otp')
export class OtpCodesController {
  constructor(
    private readonly otpCodesService: OtpCodesService,
    private readonly i18n: CustomI18nService,
  ) {}

  @Post('resendOtp')
  //for signUp & reset password
  async ResendOtpCode(
    @Body() body: ResendOtpCodeDto,
  ): Promise<{ message: string }> {
    return await this.otpCodesService.resendOtpCode(body);
  }

  @Patch('verifyUser')
  async verifyUserForSignUp(
    @Body('code') code: string,
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    return await this.otpCodesService.verifyUserForSignUp(code, email);
  }

  @Post('sendResetPassOtp')
  async sendResetPasswordOtp(@Body('email') email: string) {
    const otp = await this.otpCodesService.generateOtp(
      email,
      OtpCodeType.ForgetPassword,
    );
    if (otp) {
      return { message: this.i18n.translate('common.otpSend') };
    }
  }

  @Patch('checkResetOtp')
  async UseResetPasswordOtpCode(
    @Body('email') email: string,
    @Body('code') code: string,
  ) {
    return await this.otpCodesService.UseResetPasswordOtpCode(code, email);
  }
}
