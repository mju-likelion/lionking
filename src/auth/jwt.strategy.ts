import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { UserRepository } from './user-repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {
    super({
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies.jwt;
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  async validate(payload) {
    const { id } = payload;
    if (!payload) {
      throw new UnauthorizedException('로그인을 해주세요');
    }
    const users: User = await this.userRepository.findOne({ id });

    return users;
  }
}
