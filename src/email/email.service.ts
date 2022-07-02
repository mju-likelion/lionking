import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailVerifyDto } from 'src/auth/dto/email-verify.dto';

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
      template: `./${templateName}`,
      context,
    });

    return true;
  }

  async emailSend(emailVerifyDto: EmailVerifyDto, subjcet: string, html: string) {
    await this.mailSend([emailVerifyDto.email], subjcet, html, {
      token: emailVerifyDto.token,
    });
  }

  async signup(to: string) {
    await this.mailSend([to], '회원가입 완료', 'signup.ejs', {
      email: to,
    });
  }
}
