import {  Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private flowersRepository: Repository<Flower>,
  ) {}


  private readonly logger =  new Logger('FlowersService');

 
  async create(createFlowerDto: CreateFlowerDto): Promise<Flower> {
      return await this.flowersRepository.save(createFlowerDto)
  }

 async findAll(type:  string ): Promise<Flower[]> {
    if (type)
      return await this.flowersRepository.findBy({
        type: type,
      });
    return await this.flowersRepository.find();
  }

  async findOne(id: number): Promise<Flower | null> {
    const flower =  await this.flowersRepository.findOne({
      where: { id },
    });
    if(!flower) throw new NotFoundException(`Flower with id ${id} not found`);
    return flower;
  }

  async update(id: number, updateFlowerDto: UpdateFlowerDto): Promise<Flower> {
    await this.flowersRepository.update(id, updateFlowerDto);
    return this.flowersRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.flowersRepository.delete(id);
  }
}
