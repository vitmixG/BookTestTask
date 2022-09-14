import React from "react";
import { NewBook } from "../../Type/Book";
import { Link } from "react-router-dom";
import { Button, TableCell, Table, TableHead, TableRow, TableBody } from "@mui/material";
import { Loader } from "../Loader/Loader";
import './dashboard.css'

interface Props {
  books: NewBook[],
  onDelete: (bookId: number) => void,
  setBook: (arg: NewBook) => void,
  isError: boolean,
  isLoading: boolean
}

export const Dashboard: React.FC<Props> = (props) => {
  const { books, onDelete, setBook, isError, isLoading } = props;

  const getBookById = (bookId:number) => {
    return books.find((book) => book.id === bookId);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <p>Something went wrong. Pls try again later.</p>
      )}
      { !isLoading && books.length === 0 && !isError && (
        <p>
          The list of books is empty!
        </p>
      )}
    {!isLoading && (
      <>
        <Table sx={{ minWidth: 300, maxWidth: 1000 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(book => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.aurthor}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.ISBN}</TableCell>
              <TableCell>{<div>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    const bookById = getBookById(book.id);

                    if (typeof bookById !== "undefined") {
                      setBook(bookById);
                    }
                  }}
                >
                  <Link
                    to="edit-book"
                    className="routerLink"
                  >
                    Edit
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(book.id)}
                >
                  Delete
                </Button>
              </div>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <Button
          type="button"
          variant="contained"
          color="success"
        >
          <Link
            to="addNew"
            className="routerLink"
          >
            AddNew
          </Link>
        </Button>
      </>)}
      </div>
  )
}
