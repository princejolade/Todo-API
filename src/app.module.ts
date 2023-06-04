import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { APP_GUARD } from '@nestjs/core';
import { RouteGuard } from './common/guards/route.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      autoLoadEntities: true,
      synchronize: true,
      database: 'todo',
    }),
    TasksModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RouteGuard,
    },
  ],
})
export class AppModule {}
