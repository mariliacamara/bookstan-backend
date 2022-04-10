import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Genre } from '../genres/genre.schema';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  author: string;

  @Prop({ type: String })
  edition: string;

  @Prop({ type: String })
  publishedAt: string;

  @Prop({ type: String })
  language: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Genre.name }],
  })
  @Type(() => Genre)
  genres: Genre;

  @Prop({ type: String })
  review: string;

  @Prop({ type: Boolean, default: false })
  borrowed: boolean;

  @Prop({ type: String })
  borrowedTo: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
