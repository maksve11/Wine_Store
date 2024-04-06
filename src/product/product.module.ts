import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.model';
import { Category } from '../category/category.model';
import { typeOrmConfig } from '../db/typeorm.config';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Product, Category]),
    AuthModule,
  ],
  providers: [ProductRepository, RolesGuard, AuthGuard],
  exports: [ProductRepository],
})
export class ProductModule {}
