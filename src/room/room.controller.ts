import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/auth/dto/response.dto';
import { User } from 'src/auth/user.entity';
import { MemoCredentialDto } from 'src/memo/dto/memo-credential.dto';
import { Memo } from 'src/memo/memo.entity';

import { GetUserId } from '../auth/get-user.decorator';

import { SwaggerErrorDto } from './dto/swagger-error.dto';
import { SwaggerResponseDto } from './dto/swagger-response.dto';
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
          userName: {
            name: 'Crmal',
          },
          memoData: [
            {
              id: 4,
              title: '제목1',
              content: '내용1',
            },
            {
              id: 1,
              title: '제목2',
              content: '내용2',
            },
            {
              id: 6,
              title: '제목3',
              content: '내용3',
            },
            {
              id: 5,
              title: '제목4',
              content: '내용4',
            },
            {
              id: 3,
              title: '제목5',
              content: '내용5',
            },
          ],
        },
      },
    },
  })
  @ApiResponse(new SwaggerErrorDto(404, '{roomsId} 해당룸이 존재하지않습니다.'))
  @Get('/:id')
  async getRooms(@Param('id', ParseIntPipe) id: number, @GetUserId() userId: number) {
    return this.roomService.getRoom(id, userId);
  }

  // 방명록 생성
  @ApiOperation({
    summary: '방명록 생성 API',
    description: '방명록을 생성합니다.',
  })
  @ApiResponse({
    description: '생성한 방명록 응답',
    schema: {
      example: {
        data: {
          id: 4,
          title: '제목1',
          content: '내용1',
        },
      },
    },
    status: 201,
  })
  @Post('/:id/memos')
  async createRoomMemos(
    @Body(ValidationPipe) memoCredentialDto: MemoCredentialDto,
    @GetUserId() userId: User,
    @Param('id', ParseIntPipe) id: Room,
  ): Promise<{ data: Memo }> {
    return this.roomService.createRoomMemos(memoCredentialDto, userId, id);
  }

  @ApiOperation({
    summary: '방 삭제 API',
    description: '방을 삭제합니다.',
  })
  @ApiResponse(new SwaggerErrorDto(403, '권한이 없습니다.'))
  @ApiResponse(new SwaggerErrorDto(404, '해당 라운지에 가입되어있지 않습니다.'))
  @ApiResponse(new SwaggerResponseDto(200, '라운지를 탈퇴하였습니다.'))
  @Delete('/:id')
  async deleteRoomMemos(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    return this.roomService.deleteRoomMemos(+id);
  }

  // 방명록 전체조회
  @ApiOperation({
    summary: '방명록 전체 조회 API',
    description: '방명록을 전체 조회합니다.',
  })
  @ApiResponse({
    description: '생성한 방명록 응답',
    schema: {
      example: {
        data: [
          {
            id: 1,
            title: '제목2',
            content: '이름1',
          },
          {
            id: 2,
            title: '제목1',
            content: '이름1',
          },
          {
            id: 3,
            title: '제목1',
            content: '이름1',
          },
          {
            id: 4,
            title: '제목1',
            content: '이름1',
          },
        ],
      },
    },
    status: 201,
  })
  @Get('/:id/memos')
  async getMyRoomMemos(
    @Param('id', ParseIntPipe) id: number,
    @GetUserId() userId: number,
  ): Promise<{ data: Memo }> {
    return this.roomService.getMyRoomMemos(+id, +userId);
  }
}
