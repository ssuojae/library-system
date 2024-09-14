import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: number): Book {
    return this.booksService.getBookById(Number(id));
  }

  @Post(':title/:author')
  addBook(@Param('title') title: string, @Param('author') author: string): Book {
    return this.booksService.addBook(title, author);
  }

  @Patch(':id/borrow')
  borrowBook(@Param('id') id: number): Book {
    return this.booksService.borrowBook(Number(id));
  }

  @Patch(':id/return')
  returnBook(@Param('id') id: number): Book {
    return this.booksService.returnBook(Number(id));
  }
}