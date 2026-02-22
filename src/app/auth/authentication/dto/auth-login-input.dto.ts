import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class AuthLoginInputDto {
  @IsEmail({}, { message:i18nValidationMessage('validations.invalidEmail')})
  @IsNotEmpty({message:i18nValidationMessage('validations.emailNotEmpty')})
  email: string;

  @IsString({ message: i18nValidationMessage('validations.passwordMustBeString')})
  @IsNotEmpty({ message:i18nValidationMessage('validations.passwordRequired') })
  password: string;

  @IsOptional()
  @IsString()
  deviceToken?: string;
}
