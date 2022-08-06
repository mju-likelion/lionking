import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/auth/dto/response.dto';
import { User } from 'src/auth/user.entity';
import { MemoCredentialDto } from 'src/memo/dto/memo-credential.dto';
import { MemoRepository } from 'src/memo/memo-repository';
import { Memo } from 'src/memo/memo.entity';
import { Room } from 'src/room/room.entity';

import { RoomQueryDto } from './dto/room-query.dto';
import { RoomRepository } from './room-repository';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
    @InjectRepository(MemoRepository)
    private readonly memoRepository: MemoRepository,
  ) {}

  async getRoom(roomsId: number, userId: number): Promise<{ data: any }> {
    const memoData = await this.memoRepository.getRoom(roomsId, userId);
    return { data: memoData };
  }

  async createRoomMemos(
    memoCredentialDto: MemoCredentialDto,
    userId: User,
    loungeId: Room,
  ): Promise<Memo> {
    const roomId = await this.roomRepository.findOne(loungeId);
    const memo = await this.memoRepository.createRoomMemos(memoCredentialDto, userId, roomId);
    return memo;
  }

  async deleteRoomMemos(memoId: number, userId: number): Promise<ResponseDto> {
    const memoCreateId = await this.roomRepository.getUserId(userId);
    if (+memoCreateId !== +userId) {
      throw new HttpException({ data: { error: '권한이 없습니다' } }, 403);
    }

    const result = await this.memoRepository.delete(memoId);

    if (result.affected === 0) {
      throw new NotFoundException(`해당 메모는 없습니다.${memoId}`);
    }

    return new ResponseDto(`${memoId} 메모를 삭제하였습니다`);
  }

  async getMyRoomMemos(roomsId: number, userId: number, page: number) {
    const memoData = await this.memoRepository.getMyRoomMemos(roomsId, userId, page);
    return memoData;
  }
}
