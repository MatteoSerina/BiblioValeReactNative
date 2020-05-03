'use-strict'

// DATABASE
export const DB_URL = 'http://192.168.1.101/bibliovale_test';
export const DB_ENPOINT = DB_URL + '/BiblioValeApi.php';

// COLORS
export const WHITE = "#FEFEFE";
export const GRAY = "#EEEEEE";
export const DARKGRAY = "#AAAAAA";
export const BLACK =  "#616161";
export const LIGHTBLUE = "rgba(74,144,226,1)";
export const RED = "red";

// MODEL
export const EMPTY_BOOK = {
    evaulation: "",
    genre: "Avventura",
    id: "",
    isbn10: "",
    isbn13: "",
    name: "",
    notes: "",
    status: "Non letto",
    surname: "",
    title: "",
    year: "",
    abstract: "",
    coverURL: "",
    cover: "",
    thumbnail: ""
  };
Object.freeze(EMPTY_BOOK);