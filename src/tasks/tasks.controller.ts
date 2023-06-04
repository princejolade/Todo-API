import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  @Roles('read-todo')
  getTasks(@User() user: string) {
    return this.tasksService.findAll(user);
  }

  @Get('/:id')
  @Roles('read-todo')
  getTask(@Param('id') id: string, @User() user: string) {
    return this.tasksService.findOne(user, id);
  }

  @Post('/')
  @Roles('create-todo')
  createTask(@User() user: string, @Body() body: CreateTaskDto) {
    return this.tasksService.create(user, body);
  }

  @Patch('/:id')
  @Roles('manage-todo')
  updateTask(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @User() user: string,
  ) {
    return this.tasksService.update(user, id, body);
  }

  @Delete('/:id')
  @Roles('manage-todo')
  deleteTask(@Param('id') id, @User() user: string) {
    return this.tasksService.remove(user, id);
  }
}
