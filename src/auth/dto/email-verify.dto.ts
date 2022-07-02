import { IsString } from 'class-validator';

import { EmailSendDto } from './email-send.dto';

export class EmailVerifyDto extends EmailSendDto {
  constructor(email: string, token: string) {
    super(email);
    this.token = token;
  }

  @IsString()
  token: string;
}
