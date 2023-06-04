import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC } from '../decorators/public.decorator';
import { jwtVerify, createRemoteJWKSet } from 'jose';
import { ROLES } from '../decorators/roles.decorator';
import { USER } from '../decorators/user.decorator';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpCtx = context.switchToHttp();
    const httpRequest = httpCtx.getRequest<Request>();

    const isPublicRoute = this.reflector.get(PUBLIC, context.getHandler());
    const roles: string[] = this.reflector.get(ROLES, context.getHandler());

    if (isPublicRoute) return true;

    if (roles.length < 1) return false;

    //Get the access token from the request header
    const ACCESS_TOKEN = httpRequest.header('Authorization')?.split(' ')[1];

    if (ACCESS_TOKEN === undefined) return false;

    let JWKS;

    try {
      //Get the necessary keys from the JWKS endpoint
      JWKS = await createRemoteJWKSet(
        new URL(
          'http://localhost:3000/realms/test/protocol/openid-connect/certs',
        ),
      );
    } catch (error) {
      return false;
    }

    try {
      const { payload } = await jwtVerify(ACCESS_TOKEN, JWKS, {
        issuer: 'http://localhost:3000/realms/test',
      });

      if (!payload) return false;

      httpRequest[USER] = payload?.sub || '';

      const available_roles = <string[]>payload?.roles || [];

      if (available_roles.length < 1) return false;

      for (const role of roles) return available_roles.includes(role);
    } catch (error) {
      if (error.code === 'ERR_JWT_EXPIRED') {
        throw new UnauthorizedException('Access token is expired');
      }

      return false;
    }

    return false;
  }
}
