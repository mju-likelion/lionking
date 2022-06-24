import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';

import { AuthService } from './auth.service';
import { emailCredentialDto } from './dto/email-credential.dto';
import { EmailVaildResponseDto } from './dto/response.dto';

@ApiTags('Auth')
@ApiResponse({ type: EmailVaildResponseDto })
@Controller('api/auth')
export class AuthController {
  constructor(private readonly emailService: EmailService, private authService: AuthService) {}

  @ApiBody({ type: emailCredentialDto })
  @ApiCreatedResponse({ type: EmailVaildResponseDto })
  @Post('/emailverify')
  async signUp(
    @Body(ValidationPipe) emailCredentialsDto: emailCredentialDto,
  ): Promise<EmailVaildResponseDto> {
    return this.authService.emailVerify(emailCredentialsDto);
  }
}
