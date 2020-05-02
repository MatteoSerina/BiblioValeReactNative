import React, { useState, useEffect } from "react";
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
import * as Constants from "../storage/Constants";
import GenrePicker from "../components/GenrePicker";
import StatusPicker from "../components/StatusPicker";
import BookFactsheet from '../components/BookFactsheet';
// import ModelNotify from "../components/ModelNotify";

import * as BookModel from "../models/BookModel";

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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setBook(currentBook);
  });

  function UpdateAuthor(newText) {
    setBook((book.surname = GetSurname(newText)));
    setBook((book.name = GetName(newText)));
  }

  async function CreateAuthor(book) {
    setLoading(true);
    let result = await BookModel.CreateAuthor(book);
    setLoading(false);

    if (result.status_id == "0") {
      Alert.alert("Nuovo autore", "Autore creato correttamente");
      return true;
    }
    Alert.alert("Errore", "Nuovo autore non creato");
    return false;
  }

  async function SaveBook(book) {
    setLoading(true);
    let result = await BookModel.SaveBook(book);
    console.log("result: " + JSON.stringify(book));
    console.log("result: " + JSON.stringify(result));
    setLoading(false);
    if (result.status_id == "0") {
      Alert.alert("Salvataggio", "Libro salvato", [], { cancelable: true });
      props.navigation.goBack();
      return true;
    }
    Alert.alert("Errore", "Libro non salvato");
    return false;
  }

  async function Save(book) {
    if (!ValidBook(book)) return false;

    setLoading(true);
    let authorExists = await BookModel.ChechAuthorExists(book);
    setLoading(false);

    if (authorExists) {
      SaveBook(book);
    } else {
      Alert.alert(
        "Autore inesistente",
        "Vuoi creare l'autore " + book.surname + ", " + book.name + "?",
        [
          {
            text: "Sì",
            onPress: () => {
              CreateAuthor(book).then((authorCreated) => {
                if (authorCreated) {
                  SaveBook(book);
                }
              });
            },
            style: "default",
          },
          {
            text: "No",
            onPress: () => {
              Alert.alert("Salvataggio interrotto", "Nuovo autore non creato");
              return false;
            },
          },
        ]
      );
    }
  }

  function ValidBook(book) {
    if (book.title === undefined || book.title.length == 0) {
      Alert.alert("Errore validazione", "Inserire il titolo", [], {
        cancelable: true,
      });
      return false;
    }
    if (book.year != "" && (isNaN(book.year) || book.year.length != 4)) {
      Alert.alert("Errore validazione", "Controllare il valore dell'anno", [], {
        cancelable: true,
      });
      return false;
    }
    return true;
  }

  return (
    <View style={[styles.container, props.style]}>      
      <ScrollView style={[styles.container, props.style]}>
        <BookFactsheet book={book}/>        
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={{ width: "40%" }} onPress={() => Save(book)}>
          <Text style={styles.saveButton}>Salva</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "40%" }}
          onPress={() => alert("Delete")}
        >
          <Text style={styles.deleteButton}>Elimina</Text>
        </TouchableOpacity>
      </View>
      {/* <ModelNotify
        title={dialogTitle}
        response={modelResponse}
        isDialogOn={isDialogOn}
        closeDialog={HideDialog}
      /> */}
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
