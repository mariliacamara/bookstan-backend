import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String, required: true })
  edition: string;

  @Prop({ type: String, required: true })
  publishedAt: string;

  @Prop({ type: String, required: true })
  language: string;

  @Prop({ type: [String], required: true })
  genre: string[];

  @Prop({ type: String, required: true })
  review: string;

  @Prop({ type: Boolean, default: false })
  borrowed: boolean;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
