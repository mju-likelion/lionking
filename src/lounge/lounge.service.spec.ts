import { Test, TestingModule } from '@nestjs/testing';

import { LoungeService } from './lounge.service';

describe('LoungeService', () => {
  let service: LoungeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoungeService],
    }).compile();

    service = module.get<LoungeService>(LoungeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
