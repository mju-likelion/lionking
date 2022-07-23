import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: '이메일', example: 'test@likelion.org' })
  @IsString()
  @Matches(/^[0-9a-zA-Z-_]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i, {
    message: '이메일을 형식이 올바르지 않습니다.',
  })
  email: string;

  @ApiProperty({ description: '패스워드 (특수문자, 영문 6~10자)', example: 'q12345' })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/, {
    message: '패스워드 형식이 올바르지 않습니다.',
  })
  password: string;
}
