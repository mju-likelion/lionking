import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  nickname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  name: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsDateString()
  createAt: Date;

  @IsDateString()
  updateAt: Date;
}
