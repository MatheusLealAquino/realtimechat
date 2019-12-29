import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor() {}

  @UseGuards(AuthGuard('local'))
  @Get()
  async get(@Request() req) {
    return req.user;
  }
}
