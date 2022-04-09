import { HttpStatus, Body, Controller, Res, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseTemplates } from '../shared/responses';
import { CreateBookDTO, UpdateBookDTO } from './books.dto';
import { BookService } from './books.service';

let ObjectId = require('mongoose').Types.ObjectId;

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(
    public readonly bookService: BookService,
    public response: ResponseTemplates,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 403, description: 'Something went wrong!'})
  @ApiResponse({ status: 404, description: 'Something went wrong!'})
  async create(@Body() data: CreateBookDTO, @Res() res: Response) {
    try {
      const book = await this.bookService.create(data);
      return this.response.success(res, HttpStatus.CREATED, book);
    } catch(err) {
      return this.response.error(res, HttpStatus.BAD_REQUEST, err.message);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  async getAll(@Res() res: Response) {
    const books = await this.bookService.findAll();
    if (books.length === 0) {
      return this.response.error(res, HttpStatus.OK, 'Your book vault is empty');
    }
    return this.response.success(res, HttpStatus.OK, books);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'The response has not been found.'})
  async findById(@Param('id') id: string, @Res() res: Response) {
    const validId = ObjectId.isValid(id);

    if (validId) {
      const book = await this.bookService.findById(id);
      return this.response.success(res, HttpStatus.OK, book);
    } else {
      return this.response.error(res, HttpStatus.NOT_FOUND, 'The book has not been found');
    }
  }

  @Put('/:id')
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'The response has not been found.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  async update(@Param('id') id: string, @Body() data: UpdateBookDTO, @Res() res: Response) {
    try {
      const book = await this.bookService.update(id, data);
      if (!book || book.hasOwnProperty('statusCode')) {
        return this.response.error(res, HttpStatus.NOT_FOUND, 'Book not found');
      }
      const updatedBook = await this.bookService.findById(id);
      return this.response.success(res, HttpStatus.OK, updatedBook);
    } catch (err) {
      return this.response.error(res, HttpStatus.BAD_REQUEST, err.message);
    }
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const book = await this.bookService.delete(id);
      return this.response.success(res, HttpStatus.OK, 'The book was successfully removed from the table.');
    } catch (err) {
      return this.response.error(res, HttpStatus.BAD_REQUEST, err.message);
    }
  }
}
