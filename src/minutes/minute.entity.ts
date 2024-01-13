import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { Association } from '../associations/associations.entity';

@Entity()
export class Minute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  voters: User[];

  @ManyToOne(() => Association)
  association: Association;
}
