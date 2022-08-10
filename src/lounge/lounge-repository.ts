import { HttpException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { LoungeCredentialDto } from './dto/lounge-credential.dto';
import { Lounge } from './lounges.entity';

@EntityRepository(Lounge)
export class LoungeRepository extends Repository<Lounge> {
  // // 내 라운지 전체 보기
  async findAllLounges(loungeId: Array<string>, page: number) {
    const loungeData = await this.createQueryBuilder('lounge')
      .where('lounge.id IN (:loungeId)', { loungeId })
      .select(['id', 'name'])
      .orderBy('lounge.createAt', 'ASC')
      .limit(3)
      .offset(page || 0)
      .execute();

    return { data: loungeData };
  }

  // 마이페이지
  async findLoungeName(loungeId: Array<string>) {
    const loungeData = await this.createQueryBuilder('lounge')
      .where('lounge.id IN (:loungeId)', { loungeId })
      .select(['id', 'name'])
      .orderBy('lounge.createAt', 'ASC')
      .execute();

    return loungeData;
  }

  // 라운지 단일
  async findLounge(id: string) {
    const roomData = await this.findOne(id, { relations: ['rooms', 'rooms.user'] });
    return roomData.rooms.map(room => ({
      roomId: room.id,
      userName: room.user.name,
    }));
  }

  // 라운지 생성
  // eslint-disable-next-line consistent-return
  async createLounge(loungeCredentialDto: LoungeCredentialDto): Promise<Lounge> {
    // 라운지 생성
    const lounge = this.create({
      limit: loungeCredentialDto.limit,
      name: loungeCredentialDto.name,
    });

    try {
      await this.save(lounge);
      return lounge;
    } catch (error) {
      if (error.sqlMessage.includes('lounge.PRIMARY')) {
        throw new HttpException(
          {
            data: { error: '알 수 없는 에러가 발생하였습니다 재시도해주세요.' },
          },
          510,
        );
      } else if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            data: { error: '이미 있는 라운지 입니다.' },
          },
          409,
        );
      } else {
        throw new HttpException(
          {
            data: { error: '의도치 않은 에러가 발생하였습니다.' },
          },
          500,
        );
      }
    }
  }
}
