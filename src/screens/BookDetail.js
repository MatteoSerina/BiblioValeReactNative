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
import { BarCodeScanner } from "expo-barcode-scanner";
import { Audio } from 'expo-av';
import Icon from "react-native-vector-icons/Ionicons";
import * as Constants from "../storage/Constants";
import BookFactsheet from "../components/BookFactsheet";
import * as ExternalDataProvider from "../externalDataProviders/ExternalDataProvider";

import * as BookModel from "../models/BookModel";

export default function BookDetail(props) {
  let currentBook = props.route.params.item;

  const [book, setBook] = useState(currentBook);
  const [isLoading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [barcode, setBarcode] = useState();

  useEffect(() => {
    chechHasPermissions();
    fetchExternalData();
  }, [props.route.params.item]);

  async function chechHasPermissions() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  }
  async function playBeep(){    
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../../assets/sound/beep.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      console.log(error);
    }
  }
  const handleBarCodeScanned = ({ type, data }) => {
    playBeep();
    setIsScanning(false);
    setBarcode(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    Alert.alert(
      "Scansione barcode",
      "Vuoi aggiornare il libro in base al codice ISBN " + data + "?",
      [
        {
          text: "Sì",
          onPress: () => {            
            setLoading(true);
            ExternalDataProvider.GetBookByIsbn(data).then((result) => setBook(result));
            setLoading(false);
          },
          style: "default",
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  async function fetchExternalData() {
    setLoading(true);
    let fetched = false;
    if (currentBook.isbn13 != null && currentBook.isbn13 != "") {
      const externalBook = await ExternalDataProvider.GetBookByIsbn(
        currentBook.isbn13
      );
      const decoratedBook = DecorateBook(currentBook, externalBook);
      setBook(decoratedBook);
      fetched = true;
    } else if (
      (fetched =
        false && currentBook.isbn10 != null && currentBook.isbn10 != "")
    ) {
      const externalBook = await ExternalDataProvider.GetBookByIsbn(
        currentBook.isbn10
      );
      const decoratedBook = DecorateBook(currentBook, externalBook);
      setBook(decoratedBook);
      fetched = true;
    } else {
      setBook(currentBook);
    }
    setLoading(false);
  }

  function DecorateBook(storedBook, externalBook) {
    const book = storedBook;

    if (book.isbn10 === undefined || book.isbn10 == "")
      book.isbn10 = externalBook.isbn10;
    if (book.isbn13 === undefined || book.isbn13 == "")
      book.isbn13 = externalBook.isbn13;
    if (book.name === undefined || book.name == "")
      book.name = externalBook.name;
    if (book.surname === undefined || book.surname == "")
      book.surname = externalBook.surname;
    if (book.title === undefined || book.title == "")
      book.title = externalBook.title;
    if (book.year === undefined || book.year == "")
      book.year = externalBook.year;
    if (book.abstract === undefined || book.abstract == "")
      book.abstract = externalBook.abstract;
    if (book.coverURL === undefined || book.coverURL == "")
      book.coverURL = externalBook.coverURL;
    return book;
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
            style: "cancel",
            onPress: () => {
              Alert.alert("Salvataggio interrotto", "Nuovo autore non creato");
              return false;
            },
          },
        ]
      );
    }
  }

  async function DeleteBook(book) {
    setLoading(true);
    let result = await BookModel.DeleteBook(book);
    setLoading(false);
    if (result.status_id == "0") {
      Alert.alert("Cancellazione libro", "Libro cancellato", [], {
        cancelable: true,
      });
      props.navigation.goBack();
      return true;
    }
    Alert.alert("Errore", "Libro non cancellato");
    return false;
  }

  async function Delete(book) {
    Alert.alert(
      "Cancellazione il libro",
      'Vuoi cancellare il libro "' + book.title + '"?',
      [
        {
          text: "Sì",
          onPress: () => {
            DeleteBook(book);
          },
          style: "default",
        },
        {
          text: "No",
          style: "destructive",
          onPress: () => {
            Alert.alert("Cancellazione interrotta", "Libro non cancellato");
            return false;
          },
        },
      ]
    );
  }

  function ValidBook(book) {
    if (book.title === undefined || book.title.length == 0) {
      Alert.alert("Errore validazione", "Inserire il titolo", [], {
        cancelable: true,
      });
      return false;
    }

    if (isNaN(book.year) || !(book.year.length == 4 || book.year == 0)) {
      Alert.alert("Errore validazione", "Controllare il valore dell'anno", [], {
        cancelable: true,
      });
      return false;
    }
    return true;
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.factSheet]}>
        <BookFactsheet book={book} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={{ width: "20%" }} onPress={() => Save(book)}>
          <Icon name="md-save" style={styles.saveButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "20%" }}
          onPress={() => setIsScanning(true)}
        >
          <Icon name="md-barcode" style={styles.barcodeButton} />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "20%" }} onPress={() => Delete(book)}>
          <Icon name="md-trash" style={styles.deleteButton} />
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
      {isScanning && (
        <BarCodeScanner
          onBarCodeScanned={!isScanning ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.WHITE,
    flexWrap: "nowrap",
    overflow: "scroll",
    borderRadius: 2,
    borderColor: Constants.GRAY,
    borderWidth: 1,
    flexDirection: "column",
    flex: 1,
  },
  factSheet: {
    overflow: "hidden",
    flexDirection: "column",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  saveButton: {
    borderColor: Constants.LIGHTBLUE,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 24,
    textAlign: "center",
    color: Constants.LIGHTBLUE,
    padding: 5,
  },
  barcodeButton: {
    borderColor: Constants.TEAL,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 24,
    textAlign: "center",
    color: Constants.TEAL,
    padding: 5,
  },
  deleteButton: {
    borderColor: Constants.RED,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 24,
    textAlign: "center",
    color: Constants.RED,
    padding: 5,
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
