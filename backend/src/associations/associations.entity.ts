import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => User, {eager: true})
    @JoinTable()
    users: User[];

}
