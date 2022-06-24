import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { emailCredentialDto } from 'src/auth/dto/email-credential.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async mailSend(
    tos: string[],
    subject: string,
    templateName: string,
    context: any = {},
  ): Promise<boolean> {
    await this.mailerService.sendMail({
      to: tos.join(', '),
      subject,
      template: `${templateName}`,
      context,
    });

    return true;
  }

  async signIn(to: emailCredentialDto) {
    await this.mailSend([to.email], '로그인 시도', 'signin.ejs', {
      email: to,
      datetime: new Date(),
    });
  }

  async signup(to: string) {
    await this.mailSend([to], '회원가입 완료', 'signup.ejs', {
      email: to,
    });
  }
}
