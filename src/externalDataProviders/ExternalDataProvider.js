import * as Constants from "../storage/Constants";
import * as OPACDataProvider from "./OPACDataProvider";
import * as GoogleDataProvider from "./GoogleDataProvider";

export async function GetBookByIsbn(isbn) {
  let book = JSON.parse(JSON.stringify(Constants.EMPTY_BOOK));

  try {
    const googleBook = await GoogleDataProvider.GetBookByIsbn(isbn);
    book = DecorateBook(book, googleBook);
    if (IsBookCompleted(book)) return book;
  } catch (error) {
    console.log(error);
  }

    try {
      const opacBook = await OPACDataProvider.GetBookByIsbn(isbn);
      book = DecorateBook(book, opacBook);
      if (IsBookCompleted(book)) return book;
    } catch (error) {
      console.log(error);
    }

  return book;
}

function IsBookCompleted(book) {
  if (book.isbn10 === undefined || book.isbn10 == "") return false;
  if (book.isbn13 === undefined || book.isbn13 == "") return false;
  if (book.name === undefined || book.name == "") return false;
  if (book.surname === undefined || book.surname == "") return false;
  if (book.title === undefined || book.title == "") return false;
  if (book.year === undefined || book.year == "") return false;
  if (book.abstract === undefined || book.abstract == "") return false;
  if (book.coverURL === undefined || book.coverURL == "") return false;

  return true;
}

function DecorateBook(book, externalBook) {
  if (book.isbn10 === undefined || book.isbn10 == "")
    book.isbn10 = externalBook.isbn10;
  if (book.isbn13 === undefined || book.isbn13 == "")
    book.isbn13 = externalBook.isbn13;
  if (book.name === undefined || book.name == "") book.name = externalBook.name;
  if (book.surname === undefined || book.surname == "")
    book.surname = externalBook.surname;
  if (book.title === undefined || book.title == "") book.title = externalBook.title;
  if (book.year === undefined || book.year == "") book.year = externalBook.year;
  if (book.abstract === undefined || book.abstract == "")
    book.abstract = externalBook.abstract;
  if (book.coverURL === undefined || book.coverURL == "")
    book.coverURL = externalBook.coverURL;

  return book;
}
