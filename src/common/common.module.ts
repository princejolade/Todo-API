import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RouteGuard } from './guards/route.guard';

@Module({
  providers: [Reflector, RouteGuard],
  exports: [RouteGuard],
})
export class CommonModule {}
