import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Matches, Max } from 'class-validator';

export class LoungeCredentialDto {
  @ApiProperty({ description: '라운지 최대 인원 수', example: '40' })
  @IsNumber()
  @Max(100)
  limit: number;

  @ApiProperty({ description: '라운지 이름', example: 'tigertown' })
  @IsString()
  @Matches(/^[가-힣|a-z|A-Z]{1,12}$/, { message: '라운지 이름 형식이 올바르지 않습니다.' })
  name: string;
}
