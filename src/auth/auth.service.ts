import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { random, times } from 'lodash';
import { EmailVaildResponseDto } from 'src/auth/dto/response.dto';
import { EmailService } from 'src/email/email.service';

import { emailCredentialDto } from './dto/email-credential.dto';
import { UserRepositroy } from './user-repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepositroy)
    private userRepository: UserRepositroy,
    private emailService: EmailService,
    @Inject(CACHE_MANAGER) private chcheManager: Cache,
  ) {}

  async emailVerify(emailCredentialsDto: emailCredentialDto): Promise<EmailVaildResponseDto> {
    const token = times(6, () => random(35).toString(36)).join('');

    await this.chcheManager.set<number>(emailCredentialsDto.email, token);
    this.emailService.signIn(emailCredentialsDto);

    let res = new EmailVaildResponseDto();
    res = {
      status: '200',
      data: {
        message: '이메일 전송을 하였습니다 메일을 확인해주세요',
      },
    };
    return res;
  }
}
