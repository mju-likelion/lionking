import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  // forRoot()에서 DB 접근 정보를 주지 않으면, 루트 경로의 ormconfig.json의 파일에서 설정 값을 자동으로 찾아 사용한다.
  imports: [TypeOrmModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
