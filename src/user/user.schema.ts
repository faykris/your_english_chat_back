import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MessageDocument } from './message.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: [] })
  conversation: MessageDocument[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);