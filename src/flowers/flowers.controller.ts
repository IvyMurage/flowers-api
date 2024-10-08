import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Query,
  UseFilters,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { PostgresExceptionFilter } from 'src/postgres-exception.filter';

@Controller('flowers')
@UseFilters(PostgresExceptionFilter)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createFlowerDto: CreateFlowerDto) {
    return this.flowersService.create(createFlowerDto);
  }

  @Get()
  findAll(@Query('type') type:{ type: string}) {
    return this.flowersService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)  id: number) {
    return this.flowersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update(id, updateFlowerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.flowersService.remove(id);
  }
}
