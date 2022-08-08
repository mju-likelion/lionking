import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ description: '메세지', example: '생성되었습니다.' })
  message: string;
}
