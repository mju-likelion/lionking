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
  ): Promise<{ data: Memo }> {
    const { title, content } = memoCredentialDto;

    const memo = this.create({ title, content, user, room });

    try {
      await this.save(memo);
      const memoReturn = await this.findOne(memo.id, { select: ['id', 'title', 'content'] });
      return { data: memoReturn };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getMyRoomMemos(roomId: number, userId: number) {
    const memoData = await this.createQueryBuilder('memo')
      .where('memo.userId IN (:userId) and memo.roomId IN (:roomId)', { userId, roomId })
      .select(['id', 'title', 'content'])
      .execute();
    return { data: memoData };
  }

  async getRoom(roomId: number, userId: number) {
    const memoData = await this.createQueryBuilder('memo')
      .where('memo.userId IN (:userId) and memo.roomId IN (:roomId)', { userId, roomId })
      .limit(5)
      .orderBy('rand()')
      .select(['id', 'title', 'content'])
      .execute();
    return memoData;
  }
}
