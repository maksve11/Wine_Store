import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.model';
import { Product } from '../product/product.model';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, RolesGuard, AuthGuard],
  imports: [
    TypeOrmModule.forFeature([Category, Product]),
    AuthModule,
  ],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
