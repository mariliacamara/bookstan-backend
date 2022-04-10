import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseTemplates } from '../../shared/responses';
import { BookController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BooksService, ResponseTemplates],
})

export class BooksModule {}
