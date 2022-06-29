import { ConflictException, InternalServerErrorException } from '@nestjs/common';
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
        throw new ConflictException('이미 있는 이메일 입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
