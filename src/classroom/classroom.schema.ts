import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MessageDocument } from 'src/user/message.schema';

export type ClassroomDocument = Classroom & Document;

@Schema()
export class Classroom {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ default: [] })
  conversation: MessageDocument[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);