import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

import { ResponseDto } from './response.dto';

export class SignInResponseDto extends ResponseDto {
  constructor(message: string, accessToken: string) {
    super(message);
    this.accessToken = accessToken;
  }

  @ApiProperty()
  @IsJWT()
  accessToken: string;
}
