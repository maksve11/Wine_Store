import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.model';
import { CreateOrderDTO } from './dto/createorder.dto';
import { UpdateOrderDTO } from './dto/updateorder.dto';
import { Product } from '../product/product.model';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private userService: UserService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDTO): Promise<Order> {
    const user = await this.userService.findById(createOrderDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Items are required');
    }

    const products = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productRepository.findOne({ where: { id: item.productId } });
        if (!product) {
          throw new NotFoundException(`Product with ID ${item.productId} not found`);
        }
        if (product.count < item.quantity) {
          throw new BadRequestException(`Insufficient quantity for product with ID ${item.productId}`);
        }
        product.count = item.quantity;
        return product;
      }),
    );

    const order = this.orderRepository.create({
      user,
      products,
      orderDate: new Date(),
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
