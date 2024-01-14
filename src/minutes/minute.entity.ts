import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Association } from '../associations/association.entity';

@Entity()
export class Minute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column('text')
    content: string;

    @ManyToMany(() => User)
    @JoinTable()
    voters: User[];

    @ManyToOne(() => Association)
    @JoinColumn()
    association: Association;
}