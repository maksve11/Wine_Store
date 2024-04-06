import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post, Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './order.model';
import { CreateOrderDTO } from './dto/createorder.dto';
import { UpdateOrderDTO } from './dto/updateorder.dto';
import { User } from '../user/user.model';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Order for the user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Order })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  async create(@Body() createOrderDto: CreateOrderDTO) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all available orders for the user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Order,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns an Order with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Order })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an Order with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Order })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDTO,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an Order with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
