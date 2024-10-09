import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    name: string,
    password: string,
    role: string = 'user',
  ): Promise<User> {
    const hashedPassword = bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findByUsername(name: string) {
    return await this.userRepository.findOne({where:{name}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return 
  }

  async remove(id: number) {
    await this.userRepository.delete({id})
  }
}
