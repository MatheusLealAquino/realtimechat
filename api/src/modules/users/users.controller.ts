import { Controller, Request, Param, Post, Get, UseGuards, Body, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../shared/decorators/roles.decorator';
import { RolesGuard } from '../../shared/guards/roles-guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChatService } from '../chats/chats.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly chatsService : ChatService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async post(@Body() createUserDto: CreateUserDto) {
    let user = JSON.parse(JSON.stringify( await this.usersService.create(createUserDto)));
    delete user.password;
    return user;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async get() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param('id') id) {
    return this.usersService.findById(id);
  }

  @Get(':id/chats')
  @UseGuards(AuthGuard('jwt'))
  async getChatsByUser(@Param('id') id, @Request() req) {
    if(req.user.userId === id) {
      return await this.chatsService.findChatsByUser(id);
    } else {
      return [];
    }
  }
}
