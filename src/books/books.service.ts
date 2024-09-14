import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  getAllBooks(): Book[] {
    return this.booksRepository.findAll();
  }

  getBookById(id: number): Book {
    const book = this.booksRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  addBook(title: string, author: string): Book {
    const book = new Book(this.generateId(), title, author);
    this.booksRepository.save(book);
    return book;
  }

  borrowBook(id: number): Book {
    const book = this.getBookById(id);
    if (book.isBorrowed) {
      throw new Error('Book is already borrowed');
    }
    book.isBorrowed = true;
    this.booksRepository.update(id, { isBorrowed: true });
    return book;
  }

  returnBook(id: number): Book {
    const book = this.getBookById(id);
    if (!book.isBorrowed) {
      throw new Error('Book is not currently borrowed');
    }
    book.isBorrowed = false;
    this.booksRepository.update(id, { isBorrowed: false });
    return book;
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000);
  }
}