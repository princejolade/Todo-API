import { SetMetadata } from '@nestjs/common';

export const PUBLIC = Symbol('public');

export const Public = () => SetMetadata(PUBLIC, true);
