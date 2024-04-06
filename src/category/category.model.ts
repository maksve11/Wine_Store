import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/product.model';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  categoryName: string;

  @Column({ nullable: true })
  categoryDescription: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
