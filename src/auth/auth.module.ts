import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { EmailModule } from 'src/email/email.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepositroy } from './user-repository';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserRepositroy]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
