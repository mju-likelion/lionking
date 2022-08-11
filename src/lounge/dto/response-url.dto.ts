import { ApiProperty } from '@nestjs/swagger';

import { UrlDto } from './url.dto';

export class ResponseUrlDto {
  constructor(loungeLink: string) {
    this.data = { loungeLink };
  }

  @ApiProperty({ type: UrlDto })
  data: {
    loungeLink: string;
  };
}
