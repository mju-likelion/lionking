import { CACHE_MANAGER, HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { random, times } from 'lodash';
import { ResponseDto } from 'src/auth/dto/response.dto';
import { EmailService } from 'src/email/email.service';

import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { EmailSendDto } from './dto/email-send.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { ResetPasswordSendDto } from './dto/reset-password-send.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserRepository } from './user-repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private emailService: EmailService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private chcheManager: Cache,
  ) {}

  async sendEmail(emailSendDto: EmailSendDto): Promise<ResponseDto> {
    const token = times(6, () => random(35).toString(36)).join('');

    await this.chcheManager.set<string>(token, emailSendDto.email, { ttl: 60 * 60 * 24 });
    const emailVerify = new EmailVerifyDto(emailSendDto.email, token);

    this.emailService.emailSend(emailVerify, '로그인 시도', 'signin.ejs');

    const res = new ResponseDto('이메일을 전송하였습니다. 메일을 확인해주세요');
    return res;
  }

  async emailVerify(emailVerifyDto: EmailVerifyDto): Promise<ResponseDto> {
    const userToken = await this.chcheManager.get(emailVerifyDto.token);

    if (userToken === emailVerifyDto.email) {
      await this.chcheManager.del(emailVerifyDto.token);
      return new ResponseDto('인증이 완료되었습니다.');
    }

    throw new HttpException(
      {
        data: { error: '인증에 실패하였습니다. 다시 인증을 시도해주세요' },
      },
      404,
    );
  }

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<ResponseDto> {
    await this.userRepository.createUser(authCredentialDto);
    return new ResponseDto('회원가입이 완료되었습니다.');
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id };
      const accessToken = this.jwtService.sign(payload);
      return new SignInResponseDto('로그인에 성공하였습니다.', accessToken);
    }

    throw new HttpException(
      {
        data: { error: '로그인에 실패하였습니다.' },
      },
      401,
    );
  }

  async resetPasswordSend(resetPasswordSendDto: ResetPasswordSendDto): Promise<ResponseDto> {
    const { email, name } = resetPasswordSendDto;
    const user = await this.userRepository.findOne({ email });
    if (name === user?.name) {
      const token = times(6, () => random(35).toString(36)).join('');
      await this.chcheManager.set<string>(token, email, { ttl: 60 * 60 * 24 });

      const sendEmail = new EmailVerifyDto(email, token);
      this.emailService.emailSend(sendEmail, '비밀번호 변경', 'resetpassword.ejs');

      return new ResponseDto('이메일을 발송하였습니다.');
    }
    throw new HttpException(
      {
        data: { error: '이름과 이메일이 일치하지 않습니다' },
      },
      409,
    );
  }

  async resetPassword(password: string, token: string): Promise<ResponseDto> {
    const email = await this.chcheManager.get<string>(token);
    await this.userRepository.updatePassword(password, email);
    return new ResponseDto('비밀번호를 변경하였습니다');
  }

  async delPassword(userId: number): Promise<ResponseDto> {
    await this.userRepository.delete(userId);
    return new ResponseDto('계정삭제를 완료하였습니다.');
  }
}
