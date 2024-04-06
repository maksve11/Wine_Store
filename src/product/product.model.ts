import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category/category.model';
import { Order } from '../order/order.model';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Product identifier', nullable: false })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'Product name', nullable: false })
  productName: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Product description', nullable: true })
  productDescription: string;

  @Column({ type: 'real' })
  @ApiProperty({ description: 'Product price', nullable: false })
  price: number;

  @Column({ nullable: true })
  @ApiProperty({ description: "Product's count", nullable: false })
  count: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  @ApiProperty({ description: 'Category identifier', nullable: false })
  category: Category;

  @ManyToOne(() => Order, (order) => order.products, { lazy: true })
  order: Order;
}