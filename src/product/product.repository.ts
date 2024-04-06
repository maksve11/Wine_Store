import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IProductRepository } from './interfaces/product.repository.interface';
import { Product } from './product.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/category.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(Body: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(Body);
    return await this.productRepository.save(product);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.productRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException(
        "Product not found and couldn't be deleted",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException(
        'Product with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async updateById(
    id: number,
    updatedFields: Partial<Product>,
  ): Promise<Product> {
    const product = await this.productRepository.preload({
      id,
      ...updatedFields,
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return await this.productRepository.save(product);
  }

  async getAllinCategory(categoryId: number): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        category: true,
      },
      where: {
        category: {
          id: categoryId,
        },
      },
    });
  }
}
