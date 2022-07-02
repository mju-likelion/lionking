import { EmailSendDto } from './email-send.dto';

export class ResetPasswordDto extends EmailSendDto {
  constructor(email: string, name: string) {
    super(email);
    this.name = name;
  }

  name: string;
}
