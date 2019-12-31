import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<Chat>
  ) {}

  async create(CreateChatDto: CreateChatDto): Promise<Chat> {
    return await new this.chatModel(CreateChatDto).save();
  }

  async findById(id: string): Promise<Chat> {
    return await this.chatModel.findById(id);
  }

}
