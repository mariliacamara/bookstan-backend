import {
  HttpStatus,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseTemplates } from '../../shared/responses';
import { CreateGenreDTO, UpdateGenreDTO } from './genre.dto';
import { GenresService } from './genres.service';

let ObjectId = require('mongoose').Types.ObjectId;

@ApiTags('genres')
@Controller('genres')
export default class GenresController {
  constructor(
    public readonly genresService: GenresService,
    public response: ResponseTemplates,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 403, description: 'Something went wrong!'})
  @ApiResponse({ status: 404, description: 'Something went wrong!'})
  async create(@Body() data: CreateGenreDTO, @Res() res: Response) {
    try {
      const genre = await this.genresService.create(data);
      return this.response.success(res, HttpStatus.CREATED, genre);
    } catch(err) {
      return this.response.error(res, HttpStatus.BAD_REQUEST, err.message);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  async getAllGenres(@Res() res, Response) {
    const genres = await this.genresService.findAll();

    if (genres.length === 0) {
      return this.response.success(res, HttpStatus.OK, 'No genre has been registered');
    }
    return this.response.success(res, HttpStatus.OK, genres);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'The response has not been found.'})
  async findById(@Param('id') id: string, @Res() res, Response) {
    const isValidId = ObjectId.isValid(id);

    if (isValidId) {
      const genre = await this.genresService.findById(id);
      console.log(genre);
      if (genre === null ) return this.response.error(res, HttpStatus.NOT_FOUND, 'The genre was not found');
      return this.response.success(res, HttpStatus.OK, genre);
    } else {
      return this.response.error(res, HttpStatus.NOT_FOUND, 'The genre was not found');
    }
  }

  @Put('/:id')
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'The response has not been found.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  async update(@Param('id') id: string, @Body() data: UpdateGenreDTO, @Res() res: Response) {
    try {
      const genre = await this.genresService.update(id, data);

      if (!genre || genre.hasOwnProperty('statusCode')) {
        return this.response.error(res, HttpStatus.NOT_FOUND, 'Genre not found');
      }
      const updatedGenre = await this.genresService.findById(id);
      return this.response.success(res, HttpStatus.OK, updatedGenre);
    } catch (err) {
      return this.response.error(res, HttpStatus.BAD_REQUEST, err.message);
    }
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.genresService.delete(id);
      return this.response.success(res, HttpStatus.OK, 'The genre was successfully removed');
    } catch (err) {
      return this.response.error(res, HttpStatus.BAD_REQUEST, err.message);
    }
  }

}
