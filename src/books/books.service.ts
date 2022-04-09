import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './books.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) public BookModel: Model<BookDocument>) {}

  async create(data): Promise<Record<string, any>> {
    return new this.BookModel(data).save();
  }

  async findAll(): Promise<Book[]> {
    return this.BookModel.find()
      .exec();
  }

  async findById(id: string): Promise<Book> {
    return this.BookModel.findById(id)
      .exec();
  }

  async update(id: string, data): Promise<Book> {
    return this.BookModel.findByIdAndUpdate(id, data)
      .exec();
  }

  async delete(id: string): Promise<Book> {
    return this.BookModel.findByIdAndDelete(id)
      .exec();
  }
}
