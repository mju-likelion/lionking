import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phone: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  name: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}
