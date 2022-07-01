import { Controller, Get } from '@nestjs/common';

import { LoungeService } from './lounge.service';

@Controller('lounge')
export class LoungeController {
  constructor(private readonly loungeService: LoungeService) {}

  @Get()
  getAll() {
    return this.loungeService.getAll();
  }
}
