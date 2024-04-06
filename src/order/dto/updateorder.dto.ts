import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../order.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDTO {
  @IsEnum(OrderStatus)
  @IsOptional()
  @ApiProperty({
    description: 'New status for the order',
    example: 'PENDING',
    enum: OrderStatus,
    required: false,
  })
  status?: OrderStatus;
}