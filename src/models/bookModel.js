import * as DbAdapter from "../storage/DbAdapter";

export async function SaveBook(book) {
  // 2.verifica se esiste autore
  //  2.1 se non esiste crea autore
  // 3. salva libro

  //   if ((await ChechAuthorExists(book)) == false)
  //     return '{"status_id": 9,"status_desc": "NONESISTEAUTORE"}';

  //   return await ChechAuthorExists(book).then((res) => console.warn(res));
  // return await DbAdapter.GetAuthors(book)
  // .then((response) => response.json())
  // .then((response) => console.warn(response.length))

  return await DbAdapter.UpsertBook(book).then((response) => response.json());
}

async function ChechAuthorExists(book) {
  return await DbAdapter.GetAuthors(book).then((response) => response.length);
}
