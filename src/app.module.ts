import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './db/typeorm.config';
import { Product } from './product/product.model';
import { Category } from './category/category.model';
import { ProductController } from './product/product.controller';
import { CategoryController } from './category/category.controller';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';
import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { Order } from './order/order.model';
import { OrderService } from './order/order.service';
import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RoleModule,
    ProductModule,
    CategoryModule,
    AuthModule,
    OrderModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Product, Category, Order]),
  ],
  controllers: [AppController, ProductController, CategoryController, UserController, RoleController, AuthController, OrderController],
  providers: [AppService, ProductService, CategoryService, OrderService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'my-secret-key',
          resave: false,
          saveUninitialized: false,
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
