import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Room } from 'src/room/room.entity';
import { EntityRepository, Repository } from 'typeorm';

import { MemoCredentialDto } from './dto/memo-credential.dto';
import { Memo } from './memo.entity';

@EntityRepository(Memo)
export class MemoRepository extends Repository<Memo> {
  async createRoomMemos(
    memoCredentialDto: MemoCredentialDto,
    user: User,
    room: Room,
  ): Promise<Memo> {
    const { title, content } = memoCredentialDto;

    const memo = this.create({ title, content, user, room });

    try {
      await this.save(memo);
      return memo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getMyRoomMemos(roomId: number, userId: number, page: number) {
    const memoData = await this.createQueryBuilder('memo')
      .where('memo.userId IN (:userId) and memo.roomId IN (roomId)', { userId, roomId })
      .limit(10)
      .offset(page || 0)
      .execute();
    return memoData;
  }

  async getRoom(roomId: number, userId: number) {
    const memoData = await this.createQueryBuilder('memo')
      .where('memo.userId IN (:userId) and memo.roomId IN (roomId)', { userId, roomId })
      .limit(2)
      .orderBy('rand()')
      .execute();
    return memoData;
  }
}
