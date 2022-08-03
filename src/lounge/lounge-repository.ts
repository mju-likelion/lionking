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
      .select(['name', 'id'])
      .orderBy('lounge.createAt', 'ASC')
      .limit(3)
      .offset(page)
      .execute();

    return { data: loungeData };
  }

  // // 라운지 단일
  // async findLounge(id: string): Promise<Lounge[]> {
  //   const userName: Lounge[] = await this.find({
  //     where: { id },
  //     relations: ['rooms'],
  //   });
  //   // room ID
  //   const roomId = this.createQueryBuilder('lounge').leftJoinAndSelect(
  //     `lounge.rooms[${i}].loungeId`,
  //     id,
  //   );
  //   // console.log(roomId);
  //   // user 이름
  //   return userName;
  // }

  // 라운지 생성
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
      if (error.code === 'ER_DUP_ENTRY') {
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
