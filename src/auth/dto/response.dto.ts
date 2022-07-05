import { ApiProperty } from '@nestjs/swagger';

import { MessageDto } from './message.dto';

export class ResponseDto {
  constructor(message: string) {
    this.data = { message };
  }

  @ApiProperty({ type: MessageDto })
  data: {
    message: string;
  };
}
