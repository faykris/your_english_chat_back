import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Classroom } from 'src/models/classroom.model';
import { ClassroomSchema } from 'src/classroom/classroom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Classroom.name, schema: ClassroomSchema },
    ]),
  ],
  providers: [UserService],
  exports: [UserService, MongooseModule],
  controllers: [UserController]
})
export class UserModule {}