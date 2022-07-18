import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { EmailSendDto } from './email-send.dto';

export class EmailVerifyDto extends EmailSendDto {
  constructor(email: string, token: string) {
    super(email);
    this.token = token;
  }

  @ApiProperty({ description: '인증코드 6자리', example: 'qry4yc' })
  @IsString()
  @Length(6, 6)
  token: string;
}
