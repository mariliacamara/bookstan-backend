import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from './genre.schema';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) public GenreModel: Model<GenreDocument>,
  ) {}

  async create(data): Promise<Record<string, any>> {
    return new this.GenreModel(data).save();
  }

  async findAll(): Promise<Genre[]> {
    return this.GenreModel.find().exec();
  }

  async findById(id: string): Promise<Genre> {
    return this.GenreModel.findById(id).exec();
  }

  async update(id: string, data): Promise<Genre> {
    return this.GenreModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: string): Promise<Genre> {
    return this.GenreModel.findByIdAndDelete(id).exec();
  }
}
