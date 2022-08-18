import { IsString } from 'class-validator';

export class ResetParamsDto {
  @IsString()
  token: string;
}
