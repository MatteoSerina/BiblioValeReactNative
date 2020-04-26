import React from "react";
import axios from "axios";
import * as Constants from "./Constants";

export async function GetAllBooks() {
  let queryString = Constants.DB_ENPOINT + "getAllBooksBaseData";

  return await fetch(queryString);
}

export async function GetAllGenres() {
  let queryString = Constants.DB_ENPOINT + "getAllGenres";

  return await fetch(queryString);
}