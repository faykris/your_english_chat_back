import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SendMessageDto } from 'src/dtos/send-message.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
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
    const { userId, message, role } = sendMessage;
    const result = await this.userModel.findByIdAndUpdate(
      userId,
      {$push: { 
        conversation: {
          id: uuidv4(),
          message,
          role,
          createdAt: new Date()
        }
      }},
      { new: true }
    ).exec();
    return result;
  }
}
