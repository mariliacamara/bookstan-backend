import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly edition: string;

  @ApiProperty()
  readonly publishedAt: string;

  @ApiProperty()
  readonly language: string;

  @ApiProperty()
  readonly genre: string[];

  @ApiProperty()
  readonly review: string;

  @ApiProperty()
  readonly borrowed: boolean;

  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt!: Date;
}

export class UpdateBookDTO extends PartialType(CreateBookDTO) {}
