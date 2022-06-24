import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async emailVerify(emailCredentialsDto: emailCredentialDto): Promise<EmailVaildResponseDto> {
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
