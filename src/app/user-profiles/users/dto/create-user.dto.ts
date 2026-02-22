import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserGender } from '../enum/user-gender.enum';
import { UserRole } from '../enum/user-role.enum';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsEmail({}, { message:i18nValidationMessage('validations.invalidEmail')})
  email: string;

  @IsPhoneNumber(null,{message:i18nValidationMessage('validations.invalidPhone')})
  @IsOptional()
  phone?: string;

  @IsEnum(UserGender, {
  message: i18nValidationMessage('validations.invalidGender'),
})
  @IsOptional()
  gender?: UserGender;

  @IsString({ message: i18nValidationMessage('validations.passwordMustBeString')})
//   @Length(6, 100, { message: 'Password must be at least 6 characters long' })
  @Matches(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
    {
      message:
        i18nValidationMessage('validations.invalidPassword'),
    },
  )
  password: string;

  @IsEnum(UserRole, {
  message: i18nValidationMessage('validations.invalidRole'),
})
  @IsOptional()
  role?: UserRole;

  @IsOptional()
  @IsString()
  deviceToken?: string;
}
