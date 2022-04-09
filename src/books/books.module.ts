import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseTemplates } from '../shared/responses';
import { BookController } from './books.controller';
import { BookService } from './books.service';
import { Book, BookSchema } from './books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService, ResponseTemplates],
})

export class BookModule {}
