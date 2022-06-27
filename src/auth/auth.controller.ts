import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';

import { AuthService } from './auth.service';
import { EmailSendDto } from './dto/email-send.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { ResponseDto } from './dto/response.dto';

@ApiTags('Auth')
@ApiResponse({ type: ResponseDto })
@Controller('api/auth')
export class AuthController {
  constructor(private readonly emailService: EmailService, private authService: AuthService) {}

  @ApiBody({ type: EmailSendDto })
  @ApiCreatedResponse({ type: ResponseDto })
  @Post('/send-email')
  async sendEmail(@Body(ValidationPipe) emailSendDto: EmailSendDto): Promise<ResponseDto> {
    return this.authService.sendEmail(emailSendDto);
  }

  @Post('/email-verify')
  async emailVerify(@Body(ValidationPipe) emailVerifyDto: EmailVerifyDto): Promise<ResponseDto> {
    return this.authService.emailVerify(emailVerifyDto);
  }
}
