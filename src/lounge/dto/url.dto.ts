import { ApiProperty } from '@nestjs/swagger';

export class UrlDto {
  @ApiProperty({ description: 'url주소', example: 'https://liontown.city' })
  loungeLink: string;
}
