import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Font } from "expo";
import * as Constants from "../storage/Constants";
import GenrePicker from "../components/GenrePicker";
import StatusPicker from "../components/StatusPicker";

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function GetSurname(str) {
  try {
    return str.split(",")[0].trim();
  } catch (error) {
    return "";
  }
}
function GetName(str) {
  try {
    return str.split(",")[1].trim();
  } catch (error) {
    return "";
  }
}

export default function BookFactsheet(props) {
  let currentBook = props.book;
  const [book, setBook] = useState(currentBook);

  useEffect(() => {
    setBook(currentBook);
  });

  function UpdateAuthor(newText) {
    setBook((book.surname = GetSurname(newText)));
    setBook((book.name = GetName(newText)));
  }
  return (
    <View>
      <TextInput
        multiline
        style={styles.titleStyle}
        placeholder="Titolo"
        onChangeText={(newText) => (currentBook.title = newText)}
      >
        {currentBook.title}
      </TextInput>
      <View style={styles.container}>
        <Image
          source={require("../../assets/img/cover_not_found.png")}
          style={styles.cardItemImagePlace}
        ></Image>
        <View style={styles.cardBody}>
          <View style={styles.bodyContent}>
            <TextInput
              multiline
              style={styles.authorStyle}
              placeholder="Cognome, Nome"
              onChangeText={(newText) => UpdateAuthor(newText)}
            >
              {currentBook.surname != "" &&
                currentBook.name != "" &&
                Capitalize(currentBook.surname) +
                  ", " +
                  Capitalize(currentBook.name)}
            </TextInput>
            <GenrePicker
              style={styles.pickerStyle}
              genre={(currentBook.genre, styles.pickerStyle)}
              selectedGenre={currentBook.genre}
              onChangeVal={(newText) => setBook((book.genre = newText))}
            />
            <StatusPicker
              style={styles.pickerStyle}
              status={(Capitalize(currentBook.status), styles.pickerStyle)}
              selectedStatus={currentBook.status}
              onChangeVal={(newText) => setBook((book.status = newText))}
            />
            <View style={styles.keyValueGroupStyle}>
              <View style={styles.keyValueStyle}>
                <Text style={styles.secondaryInfoLabelStyle}>Anno: </Text>
                <TextInput
                  style={styles.secondaryInfoInputStyle}
                  maxLength={4}
                  onChangeText={(newText) => setBook((book.year = newText))}
                >
                  {currentBook.year == "0" ? "" : currentBook.year}
                </TextInput>
              </View>
              <View style={styles.keyValueStyle}>
                <Text style={styles.secondaryInfoLabelStyle}>ISBN10: </Text>
                <TextInput
                  style={styles.secondaryInfoInputStyle}
                  maxLength={10}
                  onChangeText={(newText) => setBook((book.isbn10 = newText))}
                >
                  {currentBook.isbn10}
                </TextInput>
              </View>
              <View style={styles.keyValueStyle}>
                <Text style={styles.secondaryInfoLabelStyle}>ISBN13: </Text>
                <TextInput
                  style={styles.secondaryInfoInputStyle}
                  maxLength={13}
                  onChangeText={(newText) => setBook((book.isbn13 = newText))}
                >
                  {currentBook.isbn13}
                </TextInput>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.WHITE,
    elevation: 5,
    borderRadius: 2,
    borderColor: Constants.GRAY,
    borderWidth: 1,
    margin: 5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardBody: {
    flexDirection: "row",
    alignContent: "flex-start",
    flex: 0.7,
  },
  bodyContent: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  titleStyle: {
    color: Constants.LIGHTBLUE,
    paddingBottom: 12,
    fontSize: 24,
    textAlign: "center",
  },
  authorStyle: {
    color: Constants.BLACK,
    opacity: 0.9,
    fontSize: 22,
  },
  pickerStyle: {
    color: Constants.BLACK,
    fontSize: 25,
    fontStyle: "italic",
    marginBottom: 5,
  },
  cardItemImagePlace: {
    width: "30%",
    height: "80%",
    flex: 0.3,
    resizeMode: "contain",
    backgroundColor: Constants.WHITE,
    marginLeft: 4,
  },
  keyValueGroupStyle: {    
  },
  keyValueStyle: {
    flexDirection: "row",
    padding: 10
  },
  secondaryInfoLabelStyle: {
    color: Constants.BLACK,
    opacity: 1,
    fontSize: 16,
    textAlignVertical: "bottom",
    justifyContent: "flex-start",
    flex: 0.3,
  },
  secondaryInfoInputStyle: {
    color: Constants.BLACK,
    fontSize: 16,
    borderBottomWidth: 1,
    textAlignVertical: "bottom",
    justifyContent: "flex-start",
    flex: 0.6
  },
});
