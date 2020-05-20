import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Asset } from "expo-asset";
import { Font } from "expo";
import * as Constants from "../storage/Constants";
import * as BookModel from "../models/BookModel";
import GenrePicker from "../components/GenrePicker";
import StatusPicker from "../components/StatusPicker";
import { ScrollView } from "react-native-gesture-handler";
import SearchableDropdown from "react-native-searchable-dropdown";
import Icon from "react-native-vector-icons/Octicons";

function Capitalize(str) {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } catch (err) {
    return str;
  }
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
  const [modalVisible, setModalVisible] = useState(false);
  const [hints, setHints] = useState([]);
  const [tempAuthor, setTempAuthor] = useState(GetFormattedAuthor(currentBook));

  useEffect(() => {
    setBook(currentBook);
  });

  useEffect(() => {
    BookModel.AuthorsHint()
      .then((responseJson) => {
        setHints(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function UpdateAuthor(newText) {
    setBook((book.surname = GetSurname(newText)));
    setBook((book.name = GetName(newText)));
  }
  function GetFormattedAuthor(book) {
    if (book.surname != "" && book.name != "")
      return Capitalize(book.surname) + ", " + Capitalize(book.name);
  }
  function GetCurrentAuthorIndex() {
    try {
      return hints.findIndex((x) => x.name === GetFormattedAuthor(book));
    } catch (error) {
      return 0;
    }
  }

  return (
    <View style={{ paddingTop: 10 }}>
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
          source={{
            uri:
              book.coverURL === undefined
                ? Asset.fromModule(
                    require("../../assets/img/cover_not_found.png")
                  ).uri
                : book.coverURL,
          }}
          style={styles.cardItemImagePlace}
        ></Image>
        <View style={styles.cardBody}>
          <View style={styles.bodyContent}>            
            <TouchableOpacity
              onPress={() => {
                setTempAuthor("");
                setModalVisible(true);
              }}
            >
              <TextInput
                style={styles.authorStyle}
                placeholder="Cognome, Nome"
                editable={false}
                multiline={true}
                onTouchStart={() => setModalVisible(true)}
              >
                {GetFormattedAuthor(book)}
              </TextInput>
            </TouchableOpacity>
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
      {currentBook.abstract ? (
        <ScrollView style={styles.abstractContainer}>
          <TextInput
            multiline
            autogrow={true}
            style={styles.abstractStyle}
            editable={false}
          >
            {currentBook.abstract}
          </TextInput>
        </ScrollView>
      ) : null}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <SearchableDropdown
            style={styles.searchableDropdown}
            onTextChange={(text) => setTempAuthor(text)}
            //On text change listner on the searchable input
            onItemSelect={(item) => {
              UpdateAuthor(item.name);
              setModalVisible(false);
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ paddingLeft: 5, width: "90%" }}
            textInputProps={{multiline:true}}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              paddingLeft: 12,
              paddingVertical: 10,
              fontSize: 24,
              color: Constants.BLACK,
            }}
            itemStyle={{
              //single dropdown item style
              padding: 10,
              marginTop: 2,
              fontSize: 18,
              color: Constants.BLACK,
              borderColor: Constants.DARKGRAY,
              borderWidth: 1,
              borderRadius: 10,
            }}
            itemTextStyle={{
              //single dropdown item's text style
              color: Constants.BLACK,
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              // maxHeight: "85%",
              minHeight: "50%",
            }}
            items={hints}
            //mapping of item array
            //defaultIndex={GetCurrentAuthorIndex()}
            //default selected item index
            placeholder="Cognome, Nome"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />
          <Icon
            name="check"
            style={styles.iconStyle}
            onPress={() => {
              if (tempAuthor && tempAuthor.includes(","))
                UpdateAuthor(tempAuthor);
              setModalVisible(false);
            }}
          ></Icon>
        </View>
      </Modal>
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
    flexGrow: 1,
    alignItems: "flex-start",
  },
  abstractContainer: {
    backgroundColor: Constants.WHITE,
    elevation: 5,
    borderRadius: 2,
    borderColor: Constants.GRAY,
    borderWidth: 1,
    margin: 5,
    maxHeight: "35%",
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
    elevation: 5,
    borderRadius: 2,
    borderColor: Constants.GRAY,
    borderWidth: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    fontSize: 24,
    textAlign: "center",
  },
  authorStyle: {
    color: Constants.BLACK,
    opacity: 0.9,
    fontSize: 22,
    paddingLeft: 8,
    width: "110%",
  },
  pickerStyle: {
    color: Constants.BLACK,
    fontSize: 25,
    fontStyle: "italic",
    marginBottom: 5,
    width: "110%",
  },
  cardItemImagePlace: {
    width: "30%",
    height: "80%",
    flex: 0.3,
    resizeMode: "contain",
    backgroundColor: Constants.WHITE,
    marginLeft: 4,
  },
  keyValueGroupStyle: {},
  keyValueStyle: {
    flexDirection: "row",
    padding: 5,
  },
  secondaryInfoLabelStyle: {
    color: Constants.BLACK,
    opacity: 1,
    fontSize: 16,
    textAlignVertical: "bottom",
    justifyContent: "flex-start",
    flex: 0.35,
  },
  secondaryInfoInputStyle: {
    color: Constants.BLACK,
    fontSize: 16,
    borderBottomWidth: 1,
    textAlignVertical: "bottom",
    justifyContent: "flex-start",
    flex: 0.7,
  },
  abstractStyle: {
    color: Constants.BLACK,
    opacity: 0.9,
    fontSize: 18,
    padding: 8,
    fontStyle: "normal",
    flexWrap: "nowrap",
  },
  modalContainer: {
    flexDirection: "row",
    width: "90%",
    maxHeight: "80%",
    minHeight: "10%",
    marginTop: "20%",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: Constants.WHITE,
    opacity: 1,
    elevation: 150,
    borderColor: Constants.LIGHTBLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingRight: 10,
  },
  searchableDropdown: {
    backgroundColor: "transparent",
    flexGrow: 0,
  },
  iconStyle: {
    color: Constants.BLACK,
    fontSize: 36,
    paddingRight: 8,
    paddingTop: 8,
    marginRight: 8,
  },
});
