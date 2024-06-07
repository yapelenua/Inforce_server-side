import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
  IsUrl,
  MinLength,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class PublishedDateDTO {
  @IsString()
  date: string;
}

export class BookDTO {
  @IsInt()
  @IsOptional()
  _id: number;

  @IsString()
  @MinLength(1, { message: 'Title cannot be empty' })
  title: string;

  @IsInt()
  pageCount: number;

  @ValidateNested()
  @Type(() => PublishedDateDTO)
  publishedDate: PublishedDateDTO;

  @IsUrl()
  @MinLength(1, { message: 'URL cannot be empty' })
  thumbnailUrl: string;

  @IsString()
  @MinLength(1, { message: 'Short description cannot be empty' })
  shortDescription: string;

  @IsString()
  @MinLength(1, { message: 'Long description cannot be empty' })
  longDescription: string;

  @IsString()
  @MinLength(1, { message: 'Status cannot be empty' })
  status: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty({ message: 'Authors cannot be empty' })
  authors: string[];
}
