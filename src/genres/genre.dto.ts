import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly createdAt!: Date;
}

export class UpdateGenreDTO extends PartialType(CreateGenreDTO) {}
