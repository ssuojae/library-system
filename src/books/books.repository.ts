import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';

@Injectable()
export class BooksRepository {
  private books: Book[] = [];

  findAll(): Book[] {
    return this.books;
  }

  findById(id: number): Book {
    return this.books.find(book => book.id === id);
  }

  save(book: Book): void {
    this.books.push(book);
  }

  update(id: number, updatedBook: Partial<Book>): Book {
    const book = this.findById(id);
    if (book) {
      Object.assign(book, updatedBook);
    }
    return book;
  }
}