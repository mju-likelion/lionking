import { EntityRepository, Repository } from 'typeorm';

import { Memo } from './memo.entity';

@EntityRepository(Memo)
export class MemoRepository extends Repository<Memo> {}
