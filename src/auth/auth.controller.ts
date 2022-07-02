import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { EmailSendDto } from './dto/email-send.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResponseDto } from './dto/response.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';

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

  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<ResponseDto> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/sign-in')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @Post('/reset-password')
  async resetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseDto> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
