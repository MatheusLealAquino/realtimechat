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

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    return await new this.chatModel(createChatDto).save();
  }

  async updateChat(id: String, data: Object): Promise<Boolean> {
    const res = await this.chatModel.findOneAndUpdate({_id: id}, { 
      $push: { messages: data }
    });
    return res.nModified == 1;
  }

  async findById(id: string): Promise<Chat> {
    return await this.chatModel.findById(id);
  }

  async findChatsByUser(idUser: string): Promise<Chat> {
    return await this.chatModel.find({users: idUser});
  }

}
