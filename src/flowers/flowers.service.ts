import { Injectable } from '@nestjs/common';
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

  create(createFlowerDto: CreateFlowerDto): Promise<Flower> {
    return this.flowersRepository.save(createFlowerDto);
  }

  findAll(): Promise<Flower[]> {
    return this.flowersRepository.find();
  }

  async findOne(id: number): Promise<Flower | null> {
    return this.flowersRepository.findOne({
      where: { id },
    });
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
