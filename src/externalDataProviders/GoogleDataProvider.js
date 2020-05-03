"use-strict";
import React from "react";
import * as Constants from "../storage/Constants";

const endpoint = "https://www.googleapis.com/books/v1/volumes?q=";

export async function GetBookByIsbn(isbn) {
  let queryString = endpoint + "isbn:" + isbn;
  queryString = queryString + "&key=" + apiKey;
  try {
    let result = await fetch(queryString).then((response) => response.json());
    let book = await DataMapping(result.items[0]);
    return book;
  } catch (error) {
    console.log(error);
  }
}

async function DataMapping(googleBook) {
  let book = JSON.parse(JSON.stringify(Constants.EMPTY_BOOK));
  if (googleBook.volumeInfo === undefined || googleBook.volumeInfo == "") {
    return book;
  }
  let googleVolumeInfo = googleBook.volumeInfo;
  book.isbn10 = ISBN10DataAdatper(googleVolumeInfo);
  book.isbn13 = ISBN13DataAdatper(googleVolumeInfo);
  book.name = GetName(googleVolumeInfo);
  book.surname = GetSurname(googleVolumeInfo);
  book.title = googleVolumeInfo.title;
  book.year = GetYear(googleVolumeInfo);
  book.abstract = await GetAbstract(googleVolumeInfo);
  book.coverURL = GetCoverURL(googleVolumeInfo);
  return book;
}

function ISBN10DataAdatper(googleVolumeInfo) {
  googleVolumeInfo.industryIdentifiers.forEach((element) => {
    if ((element.type = "ISBN_10")) {
      return element.identifier;
    }
  });
}
function ISBN13DataAdatper(googleVolumeInfo) {
  googleVolumeInfo.industryIdentifiers.forEach((element) => {
    if ((element.type = "ISBN_13")) {
      return element.identifier;
    }
  });
}
function GetSurname(googleVolumeInfo) {
  try {
    return googleVolumeInfo.authors[0].split(" ")[1].trim();
  } catch (error) {
    return "";
  }
}
function GetName(googleVolumeInfo) {
  try {
    return googleVolumeInfo.authors[0].split(" ")[0].trim();
  } catch (error) {
    return "";
  }
}
function GetYear(googleVolumeInfo) {
  try {
    return googleVolumeInfo - publishedDate;
  } catch (error) {
    return "";
  }
}
async function GetAbstract(googleVolumeInfo) {
  const infoPageURL = googleVolumeInfo.infoLink;
  try {
    const infoPage = await fetch(infoPageURL);
    const htmlString = await infoPage.text();
    const cheerio = require("react-native-cheerio");
    const $ = cheerio.load(htmlString, { decodeEntities: true });
    const synopsisText = await $("#synopsistext").html();
    return synopsisText;
  } catch (error) {
    return "";
  }
}
function GetCoverURL(googleVolumeInfo) {
  try {
    return googleVolumeInfo.imageLinks.thumbnail;
  } catch (error) {
    return "";
  }
}
