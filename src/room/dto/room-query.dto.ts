import { ApiProperty } from '@nestjs/swagger';

export class RoomQueryDto {
  @ApiProperty({ description: 'page(default: 0)', example: '1', required: false })
  page: number;

  @ApiProperty({ description: 'size(defalut: 0)', example: '3', required: false })
  size: number;
}
