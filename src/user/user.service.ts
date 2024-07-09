import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SendMessageDto } from 'src/dtos/send-message.dto';
import { Classroom, ClassroomDocument } from 'src/models/classroom.model';
import { MessageGateway } from 'src/sockets/message.gateway';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private messageGateway: MessageGateway,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password, Number(process.env.SALT_NUMBER
    ));
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async addMessage(sendMessage: SendMessageDto) {
    const { classroomId, message, isModerator, username } = sendMessage;
    const result = await this.classroomModel.findByIdAndUpdate(
      classroomId,
      {
        $push: { 
          conversation: {
            id: uuidv4(),
            message,
            username,
            isModerator,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    ).exec();
    this.messageGateway.sendMessageToAll(result);
    return result;
  }
}
