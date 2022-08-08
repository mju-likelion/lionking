import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class MemoCredentialDto {
  @ApiProperty({ description: '제목', example: '제목1' })
  @IsString()
  @MaxLength(20)
  title?: string;

  @ApiProperty({ description: '내용', example: '내용1' })
  @IsString()
  @MaxLength(1000)
  content?: string;
}
