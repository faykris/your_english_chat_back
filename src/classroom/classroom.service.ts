import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassroomDto } from 'src/dtos/create-classroom.dto';
import { Classroom, ClassroomDocument } from 'src/models/classroom.model';
import { Model } from 'mongoose';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>
  ) {}

  async getAll(username?: string): Promise<Classroom[] | []> {
    return await this.classroomModel.find().exec() || [];
  }

  async getOne(_id: string): Promise<Classroom | null> {
    return await this.classroomModel.findOne({_id}).exec() || null;
  }

  async register(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    try {
      const classroom = await this.classroomModel.create(createClassroomDto);
      return classroom;
    } catch(error) {
      throw new BadRequestException(error.message);
    }
  }
}
