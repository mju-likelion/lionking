import { IsString, Matches } from 'class-validator';

export class emailCredentialDto {
  @IsString()
  @Matches(/^[0-9a-zA-Z-_]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i, {
    message: '이메일을 형식이 올바르지 않습니다.',
  })
  email: string;
}
