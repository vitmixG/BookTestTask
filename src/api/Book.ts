import { NewBook } from "../Type/Book";
import { client } from '../utils/fetchClient';

export const getBook = () => {
  return client.get(`/books`);
};

export const addBook = (newBook: NewBook) => {
  return client.post('/books', newBook);
};

export const updateBook = (bookId:number, data: {}) => {
  return client.patch(`/books/${(bookId)}`, data);
};

export const deleteBook = (bookId: number) => {
  return client.delete(`/books/${(bookId)}`);
};
