import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createuser.dto';
import { Role } from '../role/role.model';
import { AddRoleToUserDTO } from './dto/addroleuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const role = await this.roleRepository.findOneBy({ id: createUserDto.roleId });
    if (!role) {
      throw new Error('Role not found');
    }
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = role;
    return this.userRepository.save(user);
  }

  async addRoleToUser(
    id: number,
    addRoleToUserDto: AddRoleToUserDTO,
  ): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    const role = await this.roleRepository.findOneBy({ id: addRoleToUserDto.roleId });
    if (!role) {
      throw new Error('Role not found');
    }
    user.role = role;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        role: true,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async deleteByID(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOrCreateGoogleUser(email: string, displayName: string, photoURL: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = new User();
      user.email = email;
      user.displayName = displayName;
      user.photoURL = photoURL;
      user = await this.userRepository.save(user);
    }

    return user;
  }
}