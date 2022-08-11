import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { EmailService } from 'src/email/email.service';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { EmailSendDto } from './dto/email-send.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { ResetPasswordSendDto } from './dto/reset-password-send.dto';
import { ResponseDto } from './dto/response.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SwaggerErrorDto } from './dto/swagger-error.dto';
import { SwaggerOperationDto } from './dto/swagger-operation.dto';
import { SwaggerResponseDto } from './dto/swagger-response.dto';
import { GetUserId } from './get-user.decorator';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly emailService: EmailService, private authService: AuthService) {}

  @ApiOperation(
    new SwaggerOperationDto('회원가입 인증 메일전송 API', '회원가입 인증 메일을 전송합니다.'),
  )
  @ApiResponse(new SwaggerResponseDto(201, '이메일을 전송하였습니다. 메일을 확인해주세요.'))
  @Post('/send-email')
  async sendEmail(@Body(ValidationPipe) emailSendDto: EmailSendDto): Promise<ResponseDto> {
    return this.authService.sendEmail(emailSendDto);
  }

  @ApiResponse(new SwaggerResponseDto(201, '인증이 완료되었습니다.'))
  @ApiOperation(new SwaggerOperationDto('이메일 인증 API', '이메일 인증을 합니다.'))
  @ApiResponse(new SwaggerErrorDto(404, '인증에 실패하였습니다. 다시 인증을 시도해주세요'))
  @Post('/email-verify')
  async emailVerify(@Body(ValidationPipe) emailVerifyDto: EmailVerifyDto): Promise<ResponseDto> {
    return this.authService.emailVerify(emailVerifyDto);
  }

  @ApiOperation(new SwaggerOperationDto('회원가입 API', '회원가입을 합니다.'))
  @ApiResponse(new SwaggerResponseDto(201, '회원가입이 완료되었습니다.'))
  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<ResponseDto> {
    return this.authService.signUp(authCredentialDto);
  }

  @ApiOperation(new SwaggerOperationDto('로그인 API', '로그인 JWT토큰을 반환하여 줍니다.'))
  @ApiResponse(new SwaggerResponseDto(201, '로그인에 성공하였습니다.'))
  @ApiResponse(new SwaggerErrorDto(401, '로그인에 실패하였습니다.'))
  @Post('/sign-in')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto, res);
  }

  @ApiOperation(
    new SwaggerOperationDto(
      '패스워드 변경 인증코드 이메일 전송 API',
      '패스워드 변경 인증코드메일을 전송합니다.',
    ),
  )
  @ApiResponse(new SwaggerResponseDto(201, '이메일을 발송하였습니다.'))
  @ApiResponse(new SwaggerErrorDto(409, '이름과 이메일이 일치하지 않습니다'))
  @Post('/reset-password')
  async resetPasswordSend(
    @Body(ValidationPipe) resetPasswordSendDto: ResetPasswordSendDto,
  ): Promise<ResponseDto> {
    return this.authService.resetPasswordSend(resetPasswordSendDto);
  }

  @ApiOperation(
    new SwaggerOperationDto('패스워드 인증메일 인증 API ', '패스워드 변경 인증코드를 인증합니다.'),
  )
  @ApiResponse(new SwaggerResponseDto(201, '비밀번호를 변경하였습니다'))
  @ApiParam({ name: 'token', description: '토큰 6자리', example: 'qry4yc' })
  @Post('/reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body('password') password: string) {
    return this.authService.resetPassword(password, token);
  }

  @ApiOperation(new SwaggerOperationDto('계정삭제 API', '로그인된 회원의 계정을 삭제합니다.'))
  @ApiResponse(new SwaggerResponseDto(201, '계정삭제를 완료하였습니다.'))
  @Delete('/sign-drop')
  @UseGuards(AuthGuard())
  async signDrop(@GetUserId() userId: number) {
    return this.authService.delPassword(userId);
  }

  @ApiOperation(new SwaggerOperationDto('로그아웃 API', '로그아웃을 합니다.'))
  @ApiResponse(new SwaggerResponseDto(200, '로그아웃에 성공하였습니다.'))
  @Delete('/sign-out')
  @UseGuards(AuthGuard())
  async signOut(@Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
    return this.authService.signOut(res);
  }
}
