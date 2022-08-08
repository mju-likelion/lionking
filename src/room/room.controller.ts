import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/auth/dto/response.dto';
import { User } from 'src/auth/user.entity';
import { MemoCredentialDto } from 'src/memo/dto/memo-credential.dto';
import { Memo } from 'src/memo/memo.entity';

import { GetUserId } from '../auth/get-user.decorator';

import { Room } from './room.entity';
import { RoomService } from './room.service';

@UseGuards(AuthGuard())
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
  @Get('/:id')
  async getRooms(@Param('id') id: number, @GetUserId() userId: number) {
    return this.roomService.getRoom(id, userId);
  }

  // 방명록 생성
  @Post('/:id/memos')
  async createRoomMemos(
    @Body(ValidationPipe) memoCredentialDto: MemoCredentialDto,
    @GetUserId() userId: User,
    @Param('id') id: Room,
  ): Promise<Memo> {
    return this.roomService.createRoomMemos(memoCredentialDto, userId, id);
  }

  @Delete('/:id')
  async deleteRoomMemos(
    @Param('id') id: number,
    @GetUserId() userId: number,
  ): Promise<ResponseDto> {
    return this.roomService.deleteRoomMemos(+id, +userId);
  }

  // 방명록 전체조회
  @ApiQuery({ name: 'page', required: false })
  @Get('/:id/memos')
  async getMyRoomMemos(
    @Param('id') id: number,
    @GetUserId() userId: number,
    @Query('page') page: number,
  ): Promise<Memo> {
    return this.roomService.getMyRoomMemos(+id, +userId, page);
  }
}
