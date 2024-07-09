import { Module } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Classroom } from 'src/models/classroom.model';
import { ClassroomSchema } from './classroom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Classroom.name, schema: ClassroomSchema }]),
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService]
})
export class ClassroomModule {}
