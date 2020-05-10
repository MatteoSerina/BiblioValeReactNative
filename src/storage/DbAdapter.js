import React from "react";
import { AsyncStorage } from "react-native";
import * as Constants from "./Constants";

async function GetEndpoint() {
  try {
    const value = await AsyncStorage.getItem(Constants.DB_URL_LSKEY);
    if (value !== null) {
      return value + Constants.DB_API;
    }
  } catch (error) {
    console.warn(error);
  }
}

export async function GetAllBooks() {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "getAllBooksBaseData");
  return await fetch(queryString);
}

export async function SearchHint() {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "searchHint");
  return await fetch(queryString);
}

export async function GetStats() {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "getStats");
  return await fetch(queryString);
}

export async function SearchBook(searchString) {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "searchBook");
  queryString.searchParams.append("queryString", searchString);
  return await fetch(queryString);
}

export async function GetAllGenres() {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "getAllGenres");
  return await fetch(queryString);
}

export async function GetBooksByStatus(status) {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "getBooksByStatus");
  queryString.searchParams.append("status", status);
  return await fetch(queryString);
}

export async function GetAuthors(book) {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "getAuthors");
  queryString.searchParams.append("surname", book.surname);
  queryString.searchParams.append("name", book.name);
  return await fetch(queryString);
}

export async function CreateAuthor(book) {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "createAuthor");
  queryString.searchParams.append("surname", book.surname);
  queryString.searchParams.append("name", book.name);
  return await fetch(queryString);
}

export async function DeleteBook(book) {
  let queryString = new URL(await GetEndpoint());
  queryString.searchParams.append("fName", "deleteBook");
  queryString.searchParams.append("id", book.id);
  return await fetch(queryString);
}

export async function UpsertBook(book) {
  let queryString = new URL(await GetEndpoint());
  if (book.id == "" || book.id === undefined) {
    //INSERT
    queryString.searchParams.append("fName", "createBook");
    queryString.searchParams.append("title", book.title);
    queryString.searchParams.append("genre", book.genre);
    queryString.searchParams.append("surname", book.surname);
    queryString.searchParams.append("name", book.name);
    queryString.searchParams.append("year", book.year);
    queryString.searchParams.append("status", book.status);
    queryString.searchParams.append("isbn_10", book.isbn10);
    queryString.searchParams.append("isbn_13", book.isbn13);
  } else {
    //UPDATE
    queryString.searchParams.append("fName", "updateBook");
    queryString.searchParams.append("id", book.id);
    queryString.searchParams.append("title", book.title);
    queryString.searchParams.append("genre", book.genre);
    queryString.searchParams.append("surname", book.surname);
    queryString.searchParams.append("name", book.name);
    queryString.searchParams.append("year", book.year);
    queryString.searchParams.append("status", book.status);
    queryString.searchParams.append("isbn_10", book.isbn10);
    queryString.searchParams.append("isbn_13", book.isbn13);
  }
  return await fetch(queryString);
}
