import './App.css';
import { Dashboard } from "./components/Dashboard/Dashboard";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { addBook, deleteBook, getBook, updateBook } from "./api/Book";
import { BookInputForm } from "./components/BookInputForm/bookInputForm";
import { Book, NewBook } from "./Type/Book";
import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";

export const App: React.FC = () => {
  const [books, setBooks] = useState<NewBook[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<NewBook>({ ISBN: "", aurthor: "", category: "", id: 0, title: "" })

  const BooksOnPage = useCallback((newBook: NewBook) => {
    setBooks(prevState => {
      return [...prevState, newBook]
    })
  }, [])

  useEffect(() => {
    setIsLoading(true);
    getBook()
      .then(booksFromServer => setBooks(booksFromServer))
      .catch(() => setHasError(true))
      .finally(()=> setIsLoading(false));
  },[])

  const onAdd = (book:NewBook) => {
    setIsLoading(true);
    addBook(book)
      .then(newBook => (BooksOnPage(newBook)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }

  const onEdit = (bookId:number, changed: Book) => {
    setIsLoading(true);
    updateBook(bookId, changed)
      .then(response => setBooks(prev => (
        [...prev.filter(book => book.id !== response.id ), response])
      ))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }

  const onDelete = (bookId: number) => {
    setIsLoading(true);
    setBooks((prev) => (prev.filter(book => book.id !== bookId)))
    deleteBook(bookId)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="App">
      <main className="Main-header">
        <Routes>
          <Route
            path="/"
            element={
            <Dashboard
              books={books}
              onDelete={onDelete}
              setBook={setBook}
              isError={hasError}
              isLoading={isLoading}
            />}
          />
          <Route path='*' element={<NotFoundPage />} />
          <Route
            path="/edit-book"
            element={<BookInputForm onEdit={onEdit} book={book} />}
          />
          <Route
            path="/addNew"
            element={<BookInputForm onAdd={onAdd} />}
          />
        </Routes>
      </main>
    </div>
  );
}
