import { IsString, MaxLength } from 'class-validator';

export class MemoUpdateDto {
  @IsString()
  @MaxLength(20)
  title?: string;

  @IsString()
  @MaxLength(1000)
  content?: string;
}
