import * as DbAdapter from "../storage/DbAdapter";

export async function GetAllBooks() {
  try {
    return await DbAdapter.GetAllBooks().then((response) => response.json());
  } catch (error) {
    console.warn(error);
  }
}

export async function SearchHint() {
  try {
    return await DbAdapter.SearchHint().then((response) => response.json());
  } catch (error) {
    console.warn(error);
  }
}

export async function SearchBook(queryString) {
  try {
    return await DbAdapter.SearchBook(queryString).then((response) =>
      response.json()
    );
  } catch (error) {
    console.warn(error);
  }
}

export async function SaveBook(book) {
  try {
    return await DbAdapter.UpsertBook(book).then((response) => response.json());
  } catch (error) {
    console.warn(error);
  }
}

export async function CreateAuthor(book) {
  try {
    return await DbAdapter.CreateAuthor(book).then((response) =>
      response.json()
    );
  } catch (error) {
    console.warn(error);
  }
}

export async function ChechAuthorExists(book) {
  try {
    let response = await DbAdapter.GetAuthors(book);
    let responseJson = await response.json();
    if (responseJson.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.warn(error);
  }
}
