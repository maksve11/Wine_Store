import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './role.model';
import { CreateRoleDTO } from './dto/createrole.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRoleDTO } from './dto/updaterole.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDTO): Promise<Role> {
    const role = this.roleRepository.create(dto);
    return await this.roleRepository.save(role);
  }

  async updateRole(id: number, dto: UpdateRoleDTO): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    await this.roleRepository.update(id, dto);
    return await this.roleRepository.findOne({ where: { id } });
  }

  async deleteRole(id: number): Promise<void> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    await this.roleRepository.delete(id);
  }

  async findRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return role;
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
}