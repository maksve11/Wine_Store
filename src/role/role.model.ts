import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Role identifier', nullable: false })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({
    description: 'Title of role',
    nullable: false,
    example: 'Admin/base',
  })
  title: string;

  @Column({ nullable: false })
  @ApiProperty({ description: "Role's description", nullable: false })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
