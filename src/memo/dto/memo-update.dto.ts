import { IsOptional, IsString, MaxLength } from 'class-validator';

export class MemoUpdateDto {
  @IsString()
  @IsOptional()
  @MaxLength(20)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  content?: string;
}
