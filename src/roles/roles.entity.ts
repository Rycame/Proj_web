import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Association } from '../associations/association.entity';

@Entity()
export class Role {
  @Column({ primary: true })
  idUser: number;

  @Column({ primary: true })
  idAssociation: number;

  @Column()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'idUser' })
  user: User;

  @ManyToOne(() => Association)
  @JoinColumn({ name: 'idAssociation' })
  association: Association;
}
