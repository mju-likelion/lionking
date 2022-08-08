import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class MemoUpdateDto {
  @ApiProperty({ description: '제목', example: '제목1' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  title?: string;

  @IsString()
  @ApiProperty({ description: '제목', example: '제목1' })
  @IsOptional()
  @MaxLength(1000)
  content?: string;
}
