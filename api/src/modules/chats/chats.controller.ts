import { Controller, Request, Post, Body, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { ChatService } from './chats.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDto } from './dto/create-chat.dto';
import { UsersService } from '../users/users.service';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService : ChatService,
    private readonly usersService : UsersService
  ){}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async post(@Body() createChatDto: CreateChatDto) {
    return await this.chatsService.create(createChatDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param('id') id, @Request() req) {
    if(await this.usersService.userHasChat(req.user.userId, id)) {
      return await this.chatsService.findById(id);
    } else {
      throw new NotFoundException({
        'statusCode': 404,
        'error': 'Not Found',
        'message': 'Cannot find this chat'
      });
    }
  }

}
