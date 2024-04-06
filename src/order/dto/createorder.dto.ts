import {
  IsArray,
  IsInt, isNotEmpty,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDTO } from './createorder.item.dto';

export class OrderItemDTO {
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'Product ID', example: 1 })
  productId: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'Quantity of the product', example: 5 })
  quantity: number;
}

export class CreateOrderDTO {
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  @IsNotEmpty()
  @ApiProperty({
    description: 'List of products with their respective quantities',
    type: [OrderItemDTO],
  })
  items: OrderItemDTO[];

  constructor(
    userId: number,
    items: OrderItemDTO[],
  ) {
    if (isNotEmpty(userId) && isNotEmpty(items)) {
      this.userId = userId;
      this.items = items;
    } else {
      throw new Error('Invalid order DTO');
    }
  }
}
