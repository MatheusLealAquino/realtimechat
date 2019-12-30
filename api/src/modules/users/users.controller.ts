import { Controller, Request, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../shared/decorators/roles.decorator';
import { RolesGuard } from '../../shared/guards/roles-guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
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
  async get(@Request() req) {
    return this.usersService.findAll();
  }
}
