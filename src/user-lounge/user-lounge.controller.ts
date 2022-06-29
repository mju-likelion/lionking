import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserLoungeService } from './user-lounge.service';

@UseGuards(AuthGuard())
@Controller('api/user-lounges')
export class UserLoungeController {
  constructor(private readonly userLoungeService: UserLoungeService) {}

  @Get()
  async testUserLounge() {
    return this.userLoungeService.testUserLounge();
  }
}
