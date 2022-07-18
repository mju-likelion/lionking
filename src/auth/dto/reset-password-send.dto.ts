import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

import { EmailSendDto } from './email-send.dto';

export class ResetPasswordSendDto extends EmailSendDto {
  constructor(email: string, name: string) {
    super(email);
    this.name = name;
  }

  @ApiProperty({ description: '닉네임 (한글,영문,숫자 1~6자)', example: 'Crmal' })
  @Matches(/^[가-힣|a-z|A-Z|0-9]{1,6}$/, { message: '닉네임 형식이 올바르지 않습니다.' })
  @IsString()
  name: string;
}
