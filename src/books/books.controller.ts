import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dto/books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    return this.booksService.getAll();
  }

  @Get(':id')
  async getOneBook(@Param('id') id: string) {
    return this.booksService.getById(id);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async createBook(@Body() dto: BookDTO) {
    return this.booksService.create(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateBook(@Param('id') id: string, @Body() dto: BookDTO) {
    return this.booksService.updateBook(Number(id), dto);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
