import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'config/typeorm.config';

import configEmail from '../config/nodemailer.email';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { LoungeModule } from './lounge/lounge.module';
import { MemoModule } from './memo/memo.module';
import { UserLoungeModule } from './user-lounge/user-lounge.module';

@Module({
  // forRoot()에서 DB 접근 정보를 주지 않으면, 루트 경로의 ormconfig.json의 파일에서 설정 값을 자동으로 찾아 사용한다.
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configEmail],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('email'),
        template: {
          dir: `${__dirname}/templates/`,
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    EmailModule,
    CacheModule.register(),
    LoungeModule,
    MemoModule,
    UserLoungeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
