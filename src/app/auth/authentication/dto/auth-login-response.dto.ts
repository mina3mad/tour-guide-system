import { Expose } from "class-transformer";
import { UserResponseDto } from "src/app/user-profiles/users/dto/user-response.dto";

export class AuthLoginResponseDto {
  @Expose()
  token:string;

  @Expose()
  user: UserResponseDto
  ;
}
