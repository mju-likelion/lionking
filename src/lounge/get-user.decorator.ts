import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

export const GetUserId = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();

  return req.user?.id;
});
