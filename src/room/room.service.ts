import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/auth/dto/response.dto';
import { UserRepository } from 'src/auth/user-repository';
import { User } from 'src/auth/user.entity';
import { LoungeRepository } from 'src/lounge/lounge-repository';
import { MemoCredentialDto } from 'src/memo/dto/memo-credential.dto';
import { MemoRepository } from 'src/memo/memo-repository';
import { Memo } from 'src/memo/memo.entity';
import { Room } from 'src/room/room.entity';

import { RoomRepository } from './room-repository';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
    @InjectRepository(MemoRepository)
    private readonly memoRepository: MemoRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(LoungeRepository)
    private readonly loungeRepositroy: LoungeRepository,
  ) {}

  async getRoom(roomsId: number, userId: number): Promise<{ data: any }> {
    const room = await this.roomRepository.findOne(roomsId);
    if (!room) {
      throw new HttpException({ data: { error: `${roomsId} 해당룸이 존재하지않습니다.` } }, 404);
    }
    const memoData = await this.memoRepository.getRoom(roomsId, userId);
    const userName = await this.userRepository.findOne(userId, { select: ['name'] });
    return { data: { userName, memoData } };
  }

  async createRoomMemos(
    memoCredentialDto: MemoCredentialDto,
    userId: User,
    loungeId: Room,
  ): Promise<{ data: Memo }> {
    const roomId = await this.roomRepository.findOne(loungeId);
    const memo = await this.memoRepository.createRoomMemos(memoCredentialDto, userId, roomId);
    return memo;
  }

  async deleteRoomMemos(roomId: number): Promise<ResponseDto> {
    const roomData = await this.roomRepository.findOne(roomId);
    if (!roomData) {
      throw new HttpException({ data: { error: '해당 룸은 없습니다.' } }, 404);
    }
    if (roomData.admin) {
      const loungeData = await this.roomRepository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.lounge', 'lounge')
        .where('room.id = (:roomId)', { roomId })
        .select('lounge.id')
        .getRawOne();
      if (!loungeData) {
        throw new HttpException({ data: { error: '알수없는 에러가 발생하였습니다' } }, 510);
      }
      // await this.loungeRepositroy.delete(loungeData.loungeId);
    }
    await this.roomRepository.delete(roomId);
    return new ResponseDto(`라운지를 탈퇴하였습니다.`);
  }

  async getMyRoomMemos(roomsId: number, userId: number) {
    const memoData = await this.memoRepository.getMyRoomMemos(roomsId, userId);
    return memoData;
  }
}
