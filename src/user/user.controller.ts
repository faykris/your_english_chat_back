import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SendMessageDto } from 'src/dtos/send-message.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req) {
    return this.userService.findOne(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add_message')
  async login(@Body() sendMessageDto: SendMessageDto) {
    return this.userService.addMessage(sendMessageDto);
  }
}
