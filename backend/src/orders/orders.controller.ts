import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderQueryParamsDto } from './dto/order-query-params.dto';
import { OrdersResponseDto } from './dto/orders-response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAllWithFilters(
    @Query(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        exceptionFactory: (errors) => {
          const messages = errors.map((error) => {
            const constraints = error.constraints;
            return constraints
              ? Object.values(constraints).join(', ')
              : 'Invalid parameter';
          });
          return new BadRequestException({
            statusCode: 400,
            message: 'Invalid query parameters',
            errors: messages,
          });
        },
      }),
    )
    params: OrderQueryParamsDto,
  ): Promise<OrdersResponseDto> {
    // Additional validation for date range
    if (params.startDate && params.endDate) {
      const start = new Date(params.startDate);
      const end = new Date(params.endDate);
      if (start > end) {
        throw new BadRequestException(
          'startDate must be before or equal to endDate',
        );
      }
    }

    return this.ordersService.findAllWithFilters(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get(':id/track')
  trackOrder(@Param('id') id: string) {
    return this.ordersService.trackOrder(id);
  }

  @Post()
  create(@Body() createOrderDto: any) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }

  @Patch(':id/assign-rider')
  assignRider(
    @Param('id') id: string,
    @Body('riderId') riderId: string,
  ) {
    return this.ordersService.assignRider(id, riderId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
