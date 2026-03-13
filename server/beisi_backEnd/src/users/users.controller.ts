import { Controller, Get, Post, Body, Param, UseGuards, HttpCode, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AcessGuard } from '@common'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @HttpCode(200)
  create(@Body() user) {
    return this.usersService.create(user);
  }

  @UseGuards(AcessGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const {userId} = req.user
    return this.usersService.findOne(userId);
  }

}
