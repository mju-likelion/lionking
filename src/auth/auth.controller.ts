import { Body, Controller, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { EmailSendDto } from './dto/email-send.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { ResetPasswordSendDto } from './dto/reset-password-send.dto';
import { ResponseDto } from './dto/response.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { GetUserId } from './get-user.decorator';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly emailService: EmailService, private authService: AuthService) {}

  @ApiBody({ type: EmailSendDto })
  @ApiOperation({
    summary: '회원가입 인증 메일전송 API',
    description: '회원가입 인증 메일을 전송합니다.',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { data: { message: '이메일을 전송하였습니다. 메일을 확인해주세요' } },
    },
  })
  @Post('/send-email')
  async sendEmail(@Body(ValidationPipe) emailSendDto: EmailSendDto): Promise<ResponseDto> {
    return this.authService.sendEmail(emailSendDto);
  }

  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { data: { message: '인증이 완료되었습니다.' } },
    },
  })
  @ApiOperation({
    summary: '이메일 인증 API',
    description: '이메일 인증을 합니다.',
  })
  @ApiNotFoundResponse({
    description: '실패여부',
    schema: {
      example: { data: { error: '인증에 실패하였습니다. 다시 인증을 시도해주세요' } },
    },
  })
  @Post('/email-verify')
  async emailVerify(@Body(ValidationPipe) emailVerifyDto: EmailVerifyDto): Promise<ResponseDto> {
    return this.authService.emailVerify(emailVerifyDto);
  }

  @ApiOperation({
    summary: '회원가입 API',
    description: '회원가입을 합니다.',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { data: { message: '회원가입이 완료되었습니다.' } },
    },
  })
  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<ResponseDto> {
    return this.authService.signUp(authCredentialDto);
  }

  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 JWT토큰을 반환하여 줍니다.',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { data: { message: '로그인에 성공하였습니다.' } },
    },
  })
  @ApiUnauthorizedResponse({
    description: '실패여부',
    schema: {
      example: { data: { error: '로그인에 실패하였습니다.' } },
    },
  })
  @Post('/sign-in')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({
    summary: '패스워드 변경 인증코드 이메일 전송 API ',
    description: '패스워드 변경 인증코드메일을 전송합니다.',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { data: { message: '이메일을 발송하였습니다.' } },
    },
  })
  @ApiConflictResponse({
    description: '실패여부',
    schema: {
      example: { data: { error: '이름과 이메일이 일치하지 않습니다' } },
    },
  })
  @Post('/reset-password')
  async resetPasswordSend(
    @Body(ValidationPipe) resetPasswordSendDto: ResetPasswordSendDto,
  ): Promise<ResponseDto> {
    return this.authService.resetPasswordSend(resetPasswordSendDto);
  }

  @ApiOperation({
    summary: '패스워드 인증메일 인증 API ',
    description: '패스워드 변경 인증코드를 인증합니다.',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { data: { message: '비밀번호를 변경하였습니다' } },
    },
  })
  @ApiParam({ name: 'token', description: '토큰 6자리', example: 'qry4yc' })
  @Post('/reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body('password') password: string) {
    return this.authService.resetPassword(password, token);
  }

  @ApiOperation({
    summary: '계정삭제 API',
    description: '로그인된 회원의 계정을 삭제합니다. (Bearer Token 필요)',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { data: { message: '계정삭제를 완료하였습니다.' } },
    },
  })
  @Post('/sign-drop')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('token')
  async signDrop(@GetUserId() userId: number) {
    return this.authService.delPassword(userId);
  }
}
