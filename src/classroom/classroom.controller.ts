import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from 'src/dtos/create-classroom.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('classroom')
export class ClassroomController {

  constructor(private classroomService: ClassroomService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getClassroom(@Param() params: any) {
    return this.classroomService.getOne(params.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllClassrooms(@Req() req?) {
    console.log('getall')
    return this.classroomService.getAll(req.user.username)
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() createUserDto: CreateClassroomDto) {
    return this.classroomService.register(createUserDto);
  }
}
