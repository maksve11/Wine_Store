import { CreateOrderDTO } from '../dto/createorder.dto';
import { Order } from '../order.model';
import { User } from '../../user/user.model';
import { UpdateOrderDTO } from '../dto/updateorder.dto';

export interface IOrderRepository {
  create(user: User, createOrderDto: CreateOrderDTO): Promise<Order>;
  findAll(): Promise<Order[]>;
  findOne(id: number): Promise<Order>;
  update(id: number, updateOrderDto: UpdateOrderDTO): Promise<Order>;
  remove(id: number): Promise<void>;
}
