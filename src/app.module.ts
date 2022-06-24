import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configEmail from '../config/nodemailer.email';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  // forRoot()에서 DB 접근 정보를 주지 않으면, 루트 경로의 ormconfig.json의 파일에서 설정 값을 자동으로 찾아 사용한다.
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configEmail],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // eslint-disable-next-line no-console
        console.log('===== write [.env] by config: network====');
        // eslint-disable-next-line no-console
        console.log(config.get('email'));
        return {
          ...config.get('email'),
          template: {
            dir: '/Users/bagjaemin/Desktop/lionking/src/templates',
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
