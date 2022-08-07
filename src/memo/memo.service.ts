import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/auth/dto/response.dto';

import { MemoUpdateDto } from './dto/memo-update.dto';
import { MemoRepository } from './memo-repository';
import { Memo } from './memo.entity';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(MemoRepository)
    private readonly memoRepository: MemoRepository,
  ) {}

  async getMemo(id: number): Promise<{ data: Memo }> {
    const memoData = await this.memoRepository.findOne(id);
    return { data: memoData };
  }

  async deleteMemo(id: number, userId: number) {
    const memoCreateId = await this.memoRepository.findOne(id);
    if (memoCreateId.id !== userId) {
      throw new HttpException({ data: { error: '권한이 없습니다' } }, 403);
    }

    const result = await this.memoRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`${id} 해당 메모는 없습니다.`);
    }

    return new ResponseDto(`${id} 메모를 삭제하였습니다`);
  }

  async updateMemo(id: number, userId: number, memoUpdateDto: MemoUpdateDto) {
    const { title, content } = memoUpdateDto;

    const memoData = await this.memoRepository.findOne(id, {
      relations: ['user'],
    });

    if (memoData.user.id !== userId) {
      throw new HttpException({ data: { error: '권한이 없습니다' } }, 403);
    }
    if (title) {
      memoData.title = title;
    }
    if (content) {
      memoData.content = content;
    }

    await this.memoRepository.save(memoData);
    return {
      data: {
        title: memoData.title,
        content: memoData.content,
      },
    };
  }
}
