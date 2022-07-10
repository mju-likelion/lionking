import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Users } from './user.entity';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async createUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const { name, password, phone, email } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ phone, email, name, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            data: { error: '이미 있는 이메일 입니다.' },
          },
          409,
        );
      } else {
        throw new HttpException(
          {
            data: { error: '의도치 않은 에러가 발생하였습니다.' },
          },
          500,
        );
      }
    }
  }

  async updatePassword(password: string, email: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = await this.findOne({ email });
    userData.password = hashedPassword;
    try {
      await this.save(userData);
    } catch (error) {
      throw new HttpException(
        {
          data: { error: '의도치 않은 에러가 발생하였습니다.' },
        },
        500,
      );
    }
  }
}
