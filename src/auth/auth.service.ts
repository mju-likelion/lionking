import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

    await this.chcheManager.set<number>(emailSendDto.email, token, { ttl: 60 * 60 * 24 });
    const emailVerify = new EmailVerifyDto(emailSendDto.email, token);

    this.emailService.emailSend(emailVerify);

    const res = new ResponseDto('200', '이메일을 전송하였습니다. 메일을 확인해주세요');
    return res;
  }

  async emailVerify(emailVerifyDto: EmailVerifyDto): Promise<ResponseDto> {
    const userToken = await this.chcheManager.get(emailVerifyDto.email);

    if (userToken === emailVerifyDto.token) {
      const res = new ResponseDto('200', '인증이 완료되었습니다.');
      await this.chcheManager.del(emailVerifyDto.email);
      return res;
    }
    throw new NotFoundException('인증에 실패하였습니다. 다시 인증을 시도해주세요');
  }

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<ResponseDto> {
    await this.userRepository.createUser(authCredentialDto);
    return new ResponseDto('200', '회원가입이 완료되었습니다.');
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id };
      const accessToken = this.jwtService.sign(payload);
      return new SignInResponseDto('200', '로그인에 성공하였습니다.', accessToken);
    }
    throw new UnauthorizedException('로그인에 실패하였습니다.');
  }
}
