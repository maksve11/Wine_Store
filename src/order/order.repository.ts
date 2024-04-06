import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.model';
import { CreateOrderDTO } from './dto/createorder.dto';
import { UpdateOrderDTO } from './dto/updateorder.dto';
import { User } from '../user/user.model';
import { IOrderRepository } from './interfaces/order.repository.interface';
import { Product } from '../product/product.model';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(user: User, createOrderDto: CreateOrderDTO): Promise<Order> {
    const products = createOrderDto.items.map(item => {
      const product = new Product();
      product.id = item.productId;
      product.count = item.quantity;
      return product;
    });

    const order = this.orderRepository.create({
      user,
      products,
    });

    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDTO): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}