import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre extends Document{
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
