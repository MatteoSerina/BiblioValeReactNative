import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Button,
} from "react-native";
import { Font } from "expo";
import * as Constants from "../storage/Constants";
import GenrePicker from "../components/GenrePicker";
import StatusPicker from "../components/StatusPicker";

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function GetSurname(str) {
  try {
    return str.split(",")[0];
  } catch (error) {
    return "";
  }
}
function GetName(str) {
  try {
    return str.split(",")[1];
  } catch (error) {
    return "";
  }
}

export default function BookDetail(props) {
  let currentBook = props.route.params.item;

  const [book, setBook] = useState(currentBook);

  useEffect(() => {
    setBook(currentBook);
  });

  function UpdateAuthor(newText) {
    setBook((book.surname = GetSurname(newText)));
    setBook((book.name = GetName(newText)));
  }

  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        multiline
        style={styles.titleStyle}
        onChangeText={(newText) => setBook((book.title = newText))}
      >
        {currentBook.title}
      </TextInput>
      <ScrollView style={[styles.container, props.style]}>
        <View style={styles.cardBody}>
          <View style={styles.bodyContent}>
            <TextInput
              multiline
              style={styles.authorStyle}
              onChangeText={(newText) => UpdateAuthor(newText)}
            >
              {Capitalize(currentBook.surname)}, {Capitalize(currentBook.name)}
            </TextInput>
            <GenrePicker
              style={styles.genrePickerStyle}
              genre={(currentBook.genre, styles.genrePickerStyle)}
            />
            <StatusPicker
              style={styles.genrePickerStyle}
              genre={(Capitalize(currentBook.status), styles.genrePickerStyle)}
            />
            <View style={styles.keyValueStyle}>
              <Text style={styles.secondaryInfoLabelStyle}>Anno: </Text>
              <TextInput
                style={styles.secondaryInfoInputStyle}
                onChangeText={(newText) => setBook((book.year = newText))}
              >
                {currentBook.year == "0" ? "" : currentBook.year}
              </TextInput>
            </View>
            <View style={styles.keyValueStyle}>
              <Text style={styles.secondaryInfoLabelStyle}>ISBN10: </Text>
              <TextInput
                style={styles.secondaryInfoInputStyle}
                onChangeText={(newText) => setBook((book.isbn10 = newText))}
              >
                {currentBook.isbn10}
              </TextInput>
            </View>
            <View style={styles.keyValueStyle}>
              <Text style={styles.secondaryInfoLabelStyle}>ISBN13: </Text>
              <TextInput
                style={styles.secondaryInfoInputStyle}
                onChangeText={(newText) => setBook((book.isbn13 = newText))}
              >
                {currentBook.isbn13}
              </TextInput>
            </View>
          </View>
        </View>
        <Image
          source={require("../../assets/img/cover_not_found.png")}
          style={styles.cardItemImagePlace}
        ></Image>
        <Button
          title="Test"
          onPress={() => {
            alert(book.surname + ", " + book.name);
          }}
        ></Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.WHITE,
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 2,
    borderColor: Constants.GRAY,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "column",
    flex: 1,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContent: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  titleStyle: {
    color: Constants.LIGHTBLUE,
    paddingBottom: 12,
    paddingTop: 12,
    fontSize: 28,
    alignSelf: "center",
    textAlign: "center",
    //   fontFamily: "roboto-regular"
  },
  authorStyle: {
    color: Constants.BLACK,
    opacity: 1,
    fontSize: 24,
    marginBottom: 5,
    //   fontFamily: "roboto-regular",
  },
  mainInfoStyle: {
    color: Constants.BLACK,
    opacity: 1,
    fontSize: 22,
    fontStyle: "italic",
    marginBottom: 5,
    //   fontFamily: "roboto-regular",
  },
  genrePickerStyle: {
    color: Constants.BLACK,
    opacity: 1,
    fontSize: 44,
    fontStyle: "italic",
    marginBottom: 5,
    //   fontFamily: "roboto-regular",
  },
  statusPickerStyle: {
    color: Constants.BLACK,
    opacity: 1,
    fontSize: 44,
    fontStyle: "italic",
    marginBottom: 5,
    //   fontFamily: "roboto-regular",
  },
  keyValueStyle: {
    flexDirection: "row",
  },
  secondaryInfoLabelStyle: {
    color: Constants.BLACK,
    opacity: 0.7,
    fontSize: 14,
    padding: 2,
    width: "18%",
    textAlignVertical: "bottom",
  },
  secondaryInfoInputStyle: {
    color: Constants.BLACK,
    opacity: 0.7,
    fontSize: 14,
    padding: 2,
    borderBottomWidth: 1,
    textAlignVertical: "bottom",
    // fontFamily: "roboto-regular",
  },
  cardItemImagePlace: {
    width: "50%",
    backgroundColor: Constants.GRAY,
    margin: 16,
    alignSelf: "center",
  },
});
