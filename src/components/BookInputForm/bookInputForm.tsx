import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { InputField } from "../TextField/TextField";
import { Book, NewBook } from "../../Type/Book";
import { Link } from "react-router-dom";
import { SelectField } from "../SelectField/SelectField";
import './bookinput.css'
import { Button } from "@mui/material";

interface Props {
  onAdd?: (book:NewBook) => void
  onEdit?: (bookId:number, changed: Book) => void,
  book?: NewBook,
}


export const BookInputForm: React.FC<Props> = (props) => {
  const { onAdd, onEdit, book } = props
  const [id, setId] = useState(0)
  const [title, setTitle] = useState('');
  const [aurthor, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [ISBN, setISBN] = useState('');
  const [touched, setTouched] = useState(false);


  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setAuthor(book.aurthor)
      setCategory(book.category)
      setISBN(book.ISBN)
    }
  }, [])

  const changed = useMemo(() => (
    {
      title,
      aurthor,
      category,
      ISBN
    }
  ), [ISBN, aurthor, category, title])

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setISBN('');
  };


  const handlerOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    setId(Math.random() / 3);

    const newBook = {
      id,
      title,
      aurthor,
      category,
      ISBN,
    };

    if (onAdd) {
      onAdd(newBook);
    }
    clearForm();
  };

  return (
    <form className="NewMovie">
      <h2 className="title">Add a book</h2>

      <InputField
        name="title"
        label="Title"
        value={title}
        onChange={(newTitle) => {
          setTitle(newTitle);
        }}
        required
        touched={touched}
        setTouched={setTouched}
      />

      <InputField
        name="author"
        label="Author"
        value={aurthor}
        onChange={(newAuthor) => {
          setAuthor(newAuthor);
        }}
        required
        touched={touched}
        setTouched={setTouched}
      />


      <div className="select">
        <SelectField
          value={category}
          required
          touched={touched}
          setTouched={setTouched}
          onChange={(newCategory) => {
            setCategory(newCategory)
          }}
        />
    </div>
      <InputField
        name="ISBN"
        label="ISBN"
        value={ISBN}
        onChange={(newAuthor) => {
          setISBN(newAuthor);
        }}
        required
        touched={touched}
        setTouched={setTouched}
      />

      <div className="field is-grouped">
        <div className="control">
          <Button
            type="submit"
            variant="contained"
            color="success"
            className="button is-link"
            onClick={(event) => {
              if (onEdit && book) {
                debugger
                console.log('edit')
                onEdit(book.id, changed)
              } else {
                handlerOnSubmit(event);
              }

              }
            }
            disabled={!(title && aurthor && ISBN).trim()}
          >
            {!(title && aurthor && ISBN)
              ? 'Submit'
              : (
              <Link
                to='/'
                className="routerLink"
                >
                Submit
              </Link>
              )}
          </Button>
        </div>
      </div>
    </form>
  );
};
