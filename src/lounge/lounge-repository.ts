import { HttpException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { LoungeCredentialDto } from './dto/lounge-credential.dto';
import { Lounge } from './lounges.entity';

@EntityRepository(Lounge)
export class LoungeRepository extends Repository<Lounge> {
  // 내 라운지 전체 보기
  async findAllLounges(loungeCredentialDto: LoungeCredentialDto): Promise<Array<Lounge>> {
    const lounges = this.find({
      name: loungeCredentialDto.name,
    });
    try {
      return lounges;
    } catch (error) {
      throw new HttpException(
        {
          data: { error: '의도치 않은 에러가 발생하였습니다.' },
        },
        500,
      );
    }
  }

  // 라운지 생성
  async createLounge(loungeCredentialDto: LoungeCredentialDto): Promise<number> {
    // 라운지 생성
    const lounge = this.create({
      limit: loungeCredentialDto.limit,
      name: loungeCredentialDto.name,
    });
    try {
      await this.save(lounge);
      return lounge.id;
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
