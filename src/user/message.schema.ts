import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ require: true})
  id: string;

  @Prop({ require: true})
  username: string;
  
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  isModerator: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Message);