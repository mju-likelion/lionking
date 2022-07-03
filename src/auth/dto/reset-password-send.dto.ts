import { EmailSendDto } from './email-send.dto';

export class ResetPasswordSendDto extends EmailSendDto {
  constructor(email: string, name: string) {
    super(email);
    this.name = name;
  }

  name: string;
}
