import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChatService } from './chats.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService : ChatService
  ){}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async post(@Body() createChatDto: CreateChatDto) {
    return await this.chatsService.create(createChatDto);
  }

}
