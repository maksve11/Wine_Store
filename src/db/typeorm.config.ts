import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.model';
import { Role } from '../role/role.model';
import { Product } from '../product/product.model';
import { Category } from '../category/category.model';
import { Order } from '../order/order.model';

const sslOptions = {
  rejectUnauthorized: true,
};

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  entities: [Category, Product, Role, User, Order],
  synchronize: true,
  extra: {
    ssl: sslOptions,
  },
});