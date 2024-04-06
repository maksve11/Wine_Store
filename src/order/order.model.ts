import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: 'Order date', nullable: false })
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    nullable: true,
  })
  @ApiProperty({ description: 'Order status', nullable: true })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders, { lazy: true })
  @ApiProperty({ description: 'User identifier', nullable: false, type: () => User })
  user: User;

  @OneToMany(() => Product, (product) => product.order, { lazy: true })
  products: Product[];
}