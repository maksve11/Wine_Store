import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { Role } from '../role/role.model';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
})
export class UserModule {}
