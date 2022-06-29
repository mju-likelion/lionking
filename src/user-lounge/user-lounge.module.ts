import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { UserLoungeController } from './user-lounge.controller';
import { UserLoungeService } from './user-lounge.service';

@Module({
  imports: [AuthModule],
  controllers: [UserLoungeController],
  providers: [UserLoungeService],
})
export class UserLoungeModule {}
