import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseTemplates } from '../shared/responses';
import GenresController from './genres.controller';
import { GenresService }from './genres.service';
import { Genre, GenreSchema } from './genre.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  controllers: [GenresController],
  providers: [GenresService, ResponseTemplates],
})

export class GenresModule {}
