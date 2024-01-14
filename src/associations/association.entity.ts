import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'The unique identifier of the association',
        example: 1,
        type: Number,
    })
    id: number;

    @Column()
    @ApiProperty({
        description: 'The name of the association',
        example: "Computer Science Class",
        type: String,
    })
    name: string;

    @ManyToMany(type => User, { eager: true })
    @JoinTable()
    @ApiProperty({
        description: 'List of users associated with this association',
        example: '[{ "id": 1, "firstname": "John", "lastname": "Doe", "age": 28 }, { "id": 2, "firstname": "Jane", "lastname": "Doe", "age": 25 }]',
        type: 'array',
        isArray: true
    })
    users: User[];
}
