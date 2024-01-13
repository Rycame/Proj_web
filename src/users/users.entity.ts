import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: 1,
        type: Number,
    })
    id: number;

    @Column()
    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
        type: String,
    })
    firstname: string;

    @Column()
    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe',
        type: String,
    })
    lastname: string;

    @Column()
    @ApiProperty({
        description: 'The age of the user',
        example: 30,
        type: Number,
    })
    age: number;

    @Column({ unique: true, nullable: false })
    @ApiProperty({
        description: 'The password of the user',
        example: 'a_strong_password',
        type: String,
    })
    password: string;
}
