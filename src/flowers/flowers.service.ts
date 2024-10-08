import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createFlowerDto: CreateFlowerDto): Promise<Flower> {
      return await this.flowersRepository.save(createFlowerDto)
  }

  findAll(type: { type?: string }): Promise<Flower[]> {
    if (type.type)
      return this.flowersRepository.findBy({
        type: type.type,
      });
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
