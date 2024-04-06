import { IsInt, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDTO {
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'Product ID', example: 1 })
  productId: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Quantity of the product', example: 5 })
  quantity: number;
}
