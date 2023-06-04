import { SetMetadata } from '@nestjs/common';

export const ROLES = Symbol('roles');

export const Roles = (...args: string[]) => SetMetadata(ROLES, args || []);
