import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

import { AuthService } from './auth.service';
import { emailCredentialDto } from './dto/email-credential.dto';
import { EmailVaildResponseDto } from './dto/response.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly emailService: EmailService, private authService: AuthService) {}

  @Post('/emailverify')
  async signUp(
    @Body(ValidationPipe) emailCredentialsDto: emailCredentialDto,
  ): Promise<EmailVaildResponseDto> {
    return this.authService.emailVerify(emailCredentialsDto);
  }
}
