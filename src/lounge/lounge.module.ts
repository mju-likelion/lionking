import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { LoungeController } from './lounge.controller';
import { LoungeService } from './lounge.service';

@Module({
  imports: [AuthModule],
  controllers: [LoungeController],
  providers: [LoungeService],
})
export class LoungeModule {}
