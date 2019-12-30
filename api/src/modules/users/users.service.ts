import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const bcrypt = require('bcryptjs');
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return await new this.userModel(createUserDto).save();
  }

  async findOne(query: object): Promise<User | undefined> {
    return await this.userModel.findOne(query);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password');
  }
}
