import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, User]),
    UserModule,
    RoleModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductRepository],
  exports: [OrderService],
})
export class OrderModule {}

