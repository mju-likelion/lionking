import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoomQueryDto } from './dto/room-query.dto';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@ApiTags('Room')
@Controller('api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({
    summary: '방 조회 API',
    description: '방의 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: '방의 주인과 메모들에 대한 응답',
    schema: {
      example: {
        data: {
          id: 2,
          createAt: '2022-07-22T22:51:44.739Z',
          updateAt: '2022-07-22T22:51:44.739Z',
          user: {
            id: 2,
            phone: '01093202207',
            name: '박재민',
            email: 'pjm2207@naver.com',
            createAt: '2022-07-22T22:45:51.374Z',
            updateAt: '2022-07-22T22:45:51.374Z',
            password1: null,
          },
          memos: [
            {
              id: 1,
              title: '재민아',
              content: '일좀해라',
              createdAt: '2022-07-22T22:53:23.863Z',
              updatedAt: '2022-07-22T22:53:37.218Z',
            },
          ],
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getRoom(@Param() params) {
    return this.roomService.getRoom(+params.id);
  }

  // 방명록 전체조회
  @Get('/:id/memos')
  async getRoomMemos(@Param('id') id: number, @Query() roomQuery: RoomQueryDto): Promise<Room[]> {
    return this.roomService.getRoomMemos(id, roomQuery);
  }
}
