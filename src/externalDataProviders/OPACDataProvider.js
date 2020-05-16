'use-strict'
import React from "react";
import * as Constants from "../storage/Constants";

const endpoint = "http://opac.sbn.it/opacmobilegw/search.json?";

export async function GetBookByIsbn(isbn) {
  let queryString = new URL(endpoint);
  queryString.searchParams.append("isbn", isbn);

  try {
    let result = await fetch(queryString).then((response) => response.json());
    return DataMapping(result.briefRecords[0]);
  } catch (error) {
    console.log(error);
  }
}

function DataMapping(OPACbook) {
  let book = JSON.parse(JSON.stringify(Constants.EMPTY_BOOK));
  if (OPACbook === undefined || OPACbook == "") {
    return book;
  }
  book.isbn10 = ISBNDataAdatper(OPACbook.isbn);
  book.isbn13 = ISBNDataAdatper(OPACbook.isbn);
  book.name = GetName(OPACbook.autorePrincipale);
  book.surname = GetSurname(OPACbook.autorePrincipale);
  book.title = OPACbook.titolo;
  book.year = GetYear(OPACbook.pubblicazione);
  book.abstract = GetAbstract(OPACbook);
  book.coverURL = GetCoverURL(OPACbook);
  return book;
}

function ISBNDataAdatper(OPACIsbn) {
  return OPACIsbn.replace(/-/g,'');
}
function GetSurname(OPACAuthor) {
  try {
    return OPACAuthor.split(",")[0].trim();
  } catch (error) {
    return "";
  }
}
function GetName(OPACAuthor) {
  try {
    return OPACAuthor.split(",")[1].trim();
  } catch (error) {
    return "";
  }
}
function GetYear(OPACPubblicazione) {
  try {
    return OPACPubblicazione.split(",")[1].slice(-4).trim();
  } catch (error) {
    return "";
  }
}
function GetAbstract(OPACBook) {
  try {
    return OPACBook.sommarioAbstract[0];
  } catch (error) {
    return "";
  }
}
function GetCoverURL(OPACBook) {
  return OPACBook.copertina;
}
