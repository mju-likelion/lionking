import { ApiProperty } from '@nestjs/swagger';

import { UrlDto } from './url.dto';

export class ResponseUrlDto {
  constructor(url: string) {
    this.data = { url };
  }

  @ApiProperty({ type: UrlDto })
  data: {
    url: string;
  };
}
