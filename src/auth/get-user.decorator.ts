import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Users } from './user.entity';

export const GetUserId = createParamDecorator((data, ctx: ExecutionContext): Users => {
  const req = ctx.switchToHttp().getRequest();

  return req.user?.id;
});
