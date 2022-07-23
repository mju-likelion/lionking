import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({ description: '휴대폰번호', example: '01011112222' })
  @Matches(/^[0-9]{11,11}$/, { message: '휴대폰번호 형식이 올바르지 않습니다.' })
  @IsString()
  phone: string;

  @ApiProperty({ description: '닉네임 (한글,영문,숫자 1~6자)', example: 'Crmal' })
  @Matches(/^[가-힣|a-z|A-Z|0-9]{1,6}$/, { message: '닉네임 형식이 올바르지 않습니다.' })
  @IsString()
  name: string;

  @ApiProperty({ description: '패스워드 (영문 6~10자)', example: 'q12345' })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/, {
    message: '패스워드 형식이 올바르지 않습니다.',
  })
  password: string;

  @ApiProperty({ description: '이메일', example: 'test@likelion.org' })
  @IsString()
  @Matches(/^[0-9a-zA-Z-_]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i, {
    message: '이메일 형식이 올바르지 않습니다.',
  })
  email: string;
}
