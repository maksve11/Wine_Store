import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.model';
import bcrypt from 'bcrypt';
import { Order } from '../order/order.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User identifier', nullable: false })
  id: number;

  @Column({ unique: true, nullable: false })
  @ApiProperty({ description: "User's email", nullable: false })
  email: string;

  @Column({ nullable: false })
  @ApiProperty({ description: "User's password", nullable: false })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: "User's display name", nullable: true })
  displayName: string;

  @Column({ nullable: true })
  @ApiProperty({ description: "User's photo URL", nullable: true })
  photoURL: string;

  async comparePassword(candidatePassword: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(candidatePassword, this.password);
    console.log(`isPasswordValid: ${isPasswordValid}`);
    return isPasswordValid;
  }

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  @ApiProperty({ description: 'Role identifier', nullable: false })
  role: Role;

  @OneToMany(() => Order, (order) => order.user, { lazy: true })
  @ApiProperty({ description: 'User orders', type: () => [Order] })
  orders: Order[];
}