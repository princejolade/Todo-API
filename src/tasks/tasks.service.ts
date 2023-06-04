import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  private static DEFAULT_DIR = 'main';

  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  findAll(user: string) {
    return this.taskRepository.find({ where: { user } });
  }

  async findOne(user: string, id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        user,
        id: +id,
      },
    });

    if (!task) throw new NotFoundException(`Task #${id} not found`);

    return task;
  }

  create(user: string, data: CreateTaskDto) {
    const task = this.taskRepository.create({
      dir: TasksService.DEFAULT_DIR,
      important: false,
      completed: false,
      date: new Date().toISOString(),
      ...data,
      user,
    });

    return this.taskRepository.save(task);
  }

  async update(user: string, id: string, data: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id: +id,
      user,
      ...data,
    });

    if (!task) throw new NotFoundException(`Task #${id} not found`);

    return this.taskRepository.save(task);
  }

  async remove(user: string, id: string) {
    const task = await this.findOne(user, id);

    return this.taskRepository.remove(task);
  }
}
