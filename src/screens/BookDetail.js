import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { Font } from "expo";
import * as Constants from "../storage/Constants";
import GenrePicker from "../components/GenrePicker";
import StatusPicker from "../components/StatusPicker";
import ModelNotify from "../components/ModelNotify";

import * as BookModel from "../models/bookModel";

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

export default function BookDetail(props) {
  let currentBook = props.route.params.item;

  const [book, setBook] = useState(currentBook);
  const [isDialogOn, setDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [modelResponse, setModelResponse] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setBook(currentBook);
  });

  function UpdateAuthor(newText) {
    setBook((book.surname = GetSurname(newText)));
    setBook((book.name = GetName(newText)));
  }

  function Save(book) {
    if (!ValidBook(book)) return false;
    setLoading(true);
    BookModel.SaveBook(book).then((response) => {
      setModelResponse(response);
      setDialogTitle("Salva");
      setLoading(false);
      setDialog(true);
    });
  }

  function HideDialog() {
    setDialog(false);
  }

  function ValidBook(book) {
    if (book.title === undefined || book.title.length == 0) {
      Alert.alert("Errore validazione", "Inserire il titolo", [], {
        cancelable: true 
      });
      return false;
    }
    if (isNaN(book.year) || book.year.length != 4) {
      Alert.alert("Errore validazione", "Controllare il valore dell'anno", [], {
        cancelable: true 
      });
      return false;
    }
    return true;
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
        <Image
          source={require("../../assets/img/cover_not_found.png")}
          style={styles.cardItemImagePlace}
        ></Image>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{ width: "40%" }}
          onPress={(queryString) => Save(book)}
        >
          <Text style={styles.saveButton}>Salva</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "40%" }}
          onPress={() => alert("Delete")}
        >
          <Text style={styles.deleteButton}>Elimina</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          title="Test"
          style={{ margin: 50 }}
          onPress={() => {
            alert(JSON.stringify(book));
          }}
        ></Button>
      </View>
      <ModelNotify
        title={dialogTitle}
        response={modelResponse}
        isDialogOn={isDialogOn}
        closeDialog={HideDialog}
      />
      {isLoading && (
        <View style={styles.spinner} pointerEvents={"none"}>
          <ActivityIndicator
            size={100}
            animating={isLoading}
            color={Constants.LIGHTBLUE}
          />
        </View>
      )}
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
  pickerStyle: {
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  saveButton: {
    borderColor: Constants.LIGHTBLUE,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 24,
    textAlign: "center",
    color: Constants.LIGHTBLUE,
    padding: 5,
    marginLeft: 30,
  },
  deleteButton: {
    borderColor: Constants.RED,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 24,
    textAlign: "center",
    color: Constants.RED,
    padding: 5,
    marginRight: 30,
  },
  spinner: {
    position: "absolute",
    elevation: 1,
    opacity: 0.8,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
  },
});
