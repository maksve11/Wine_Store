import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICategoryRepository } from './interfaces/category.repository.interface';
import { Category } from './category.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(Body: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(Body);
    return await this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoryRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException(
        "Category not found and couldn't be deleted",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { categoryName: name },
      relations: {
        products: true,
      },
    });
    if (!category) {
      throw new HttpException(
        'Category with this name not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  async getById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new HttpException(
        'Category with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  async updateById(
    id: number,
    updatedFields: Partial<Category>,
  ): Promise<Category> {
    const category = await this.categoryRepository.preload({
      id,
      ...updatedFields,
    });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return await this.categoryRepository.save(category);
  }
}