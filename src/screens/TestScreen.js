import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import * as Constants from "../storage/Constants";
import * as OPACDataProvider from "../externalDataProviders/OPACDataProvider";
import * as GoogleDataProvider from "../externalDataProviders/GoogleDataProvider";

export default function TestScreen({ navigation }) {
  const [isbn, setIsbn] = useState("9788817142069");
  const [OPACbook, setOPACBook] = useState(
    JSON.parse(JSON.stringify(Constants.EMPTY_BOOK))
  );
  const [googleBook, setGoogleBook] = useState(
    JSON.parse(JSON.stringify(Constants.EMPTY_BOOK))
  );

  async function SearchBook() {
    let opacBook = await OPACDataProvider.GetBookByIsbn(isbn);
    // console.log('OPAC: ' + JSON.stringify(opacBook));
    setOPACBook(opacBook);
    let googleBook = await GoogleDataProvider.GetBookByIsbn(isbn);
    setGoogleBook(googleBook);
    console.log('Google: ' + JSON.stringify(googleBook));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.isbn}
        onChangeText={(newText) => setIsbn(newText)}
      >
        {isbn}
      </TextInput>
      <Button
        title="Cerca"
        style={styles.searchButton}
        onPress={() => SearchBook()}
      />
      <Text>{googleBook.abstract}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: Constants.WHITE,
  },
  providerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Constants.WHITE,
  },
  providerName: { fontSize: 32, marginLeft: 8 },
  cover: {
    borderWidth: 1,
    // width: "30%",
    // height: "100%",
    flex: 0.3,
    resizeMode: "contain",
    backgroundColor: Constants.WHITE,
    marginLeft: 16,
    marginTop: 4,
  },
  abstract: { borderWidth: 1, marginLeft: 16, width: "90%", marginTop: 4 },
  isbn: { borderWidth: 1, width: "90%", margin: 16 },
  searchButton: {},
});
