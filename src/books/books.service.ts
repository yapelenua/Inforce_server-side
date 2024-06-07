import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BookDTO } from './dto/books.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: +id,
      },
    });

    if (!book) throw new NotFoundException('Book Not Found!');

    return this.convertDateToObject(book);
  }

  async getAll() {
    const books = await this.prisma.book.findMany();
    return books.map((book) => this.convertDateToObject(book));
  }

  private convertDateToObject(book) {
    return {
      ...book,
      publishedDate: { date: book.publishedDate },
    };
  }

  async create(dto: BookDTO) {
    const { authors, publishedDate, ...bookData } = dto;
    return this.prisma.book.create({
      data: {
        ...bookData,
        publishedDate: publishedDate.date,
        authors,
      },
    });
  }

  async updateBook(id: number, dto: BookDTO) {
    const { authors, publishedDate, ...bookData } = dto;
    return this.prisma.book.update({
      where: { id },
      data: {
        ...bookData,
        publishedDate: publishedDate?.date,
        authors: authors ?? [],
      },
    });
  }

  async deleteBook(id: string) {
    const book = await this.getById(id);

    return this.prisma.book.delete({
      where: {
        id: book.id,
      },
    });
  }
}
