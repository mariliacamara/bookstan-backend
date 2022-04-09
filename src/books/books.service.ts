import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import * as mongoose from 'mongoose';
import { CreateBookDTO, UpdateBookDTO } from './books.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) public BookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.BookModel.find()
      .exec();
  }

  async findById(id: string): Promise<Book> {
    const book = await this.BookModel
      .findById(id)

    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async create(data: CreateBookDTO): Promise<Record<string, any>> {
    const newBook = new this.BookModel({
      ...data,
    })
    await newBook.populate('genres').execPopulate();
    return newBook.save()
  }

  async update(id: string, data: UpdateBookDTO): Promise<Book> {
    const book = await this.BookModel
      .findByIdAndUpdate(id, data)

    book.genres.forEach((genre) => {
      console.log(genre)
    })

    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async delete(id: string): Promise<Book> {
    const result = await this.BookModel.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async deleteMany(
    ids: string[],
    session: mongoose.ClientSession | null = null,
  ) {
    return this.BookModel.deleteMany({ _id: ids }).session(session);
  }
}
