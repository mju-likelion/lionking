import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  message: string;
}
