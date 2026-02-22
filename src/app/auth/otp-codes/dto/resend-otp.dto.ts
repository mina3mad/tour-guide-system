import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { OtpCodeType } from "../enum/otp-code-type.enum";
import { i18nValidationMessage } from "nestjs-i18n";

export class ResendOtpCodeDto {

  @IsNotEmpty({message:i18nValidationMessage('validations.emailNotEmpty')})
  @IsEmail({}, { message:i18nValidationMessage('validations.invalidEmail')})
  email: string;

  @IsNotEmpty()
  @IsEnum(OtpCodeType)
  type: OtpCodeType;
}