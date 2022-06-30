import { Test, TestingModule } from '@nestjs/testing';

import { LoungeController } from './lounge.controller';

describe('LoungeController', () => {
  let controller: LoungeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoungeController],
    }).compile();

    controller = module.get<LoungeController>(LoungeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
