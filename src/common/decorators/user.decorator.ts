import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const USER = Symbol('user');

export const User = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const httpRequest = ctx.switchToHttp().getRequest<Request>();
    const user = httpRequest[USER];

    return user;
  },
);
