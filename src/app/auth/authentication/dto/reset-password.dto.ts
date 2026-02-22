import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ResetPasswordDto {
  @IsEmail({}, { message: i18nValidationMessage('validations.invalidEmail') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.emailNotEmpty') })
  email: string;

  @IsString({
    message: i18nValidationMessage('validations.passwordMustBeString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validations.passwordRequired'),
  })
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/, {
    message: i18nValidationMessage('validations.invalidPassword'),
  })
  newPassword: string;
}
