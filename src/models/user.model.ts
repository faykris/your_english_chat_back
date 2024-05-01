import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageDocument } from 'src/user/message.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({ default: []})
  conversation: MessageDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);