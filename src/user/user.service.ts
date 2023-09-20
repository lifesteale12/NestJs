import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
var bcryptjs = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const has_pass = await bcryptjs.hashSync(createUserDto.password, 10);
      const body = {
        username: createUserDto.username,
        password: has_pass,
        email: createUserDto.email,
        fullname: createUserDto.fullname
      }
      const created = this.userRepository.create(body);
      await this.userRepository.save(created)
      return {
        message: 'successfully',
        status_code: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
