import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoungeService } from './lounge.service';

@UseGuards(AuthGuard())
@Controller('api/lounges')
export class LoungeController {
  constructor(private readonly loungeService: LoungeService) {}

  @Get()
  async testLounge() {
    return this.loungeService.testLounge();
  }
}
