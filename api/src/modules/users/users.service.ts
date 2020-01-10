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

  async userHasChat(userId: string, chatId: string): Promise<Boolean>{
    const response = await this.userModel.find({ _id: userId, chats: chatId });
    if(response && response.length > 0) return true;
    return false;
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).select('-password');
  }

  async findOne(query: object): Promise<User | undefined> {
    return await this.userModel.findOne(query);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password');
  }
}
