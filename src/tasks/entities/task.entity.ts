import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly title: string;

  @Column()
  readonly dir: string;

  @Column()
  readonly user: string;

  @Column()
  readonly description: string;

  @Column()
  readonly date: string;

  @Column()
  readonly completed: boolean;

  @Column()
  readonly important: boolean;
}
