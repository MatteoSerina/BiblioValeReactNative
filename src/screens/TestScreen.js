import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import Icon from "react-native-vector-icons/Octicons";
import * as Constants from "../storage/Constants";
import * as BookModel from "../models/BookModel";

export default function TestScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [hints, setHints] = useState([]);

  // const data = [
  //   { name: "Ram", email: "ram@gmail.com", age: 23 },
  //   { name: "Shyam", email: "shyam23@gmail.com", age: 28 },
  //   { name: "John", email: "john@gmail.com", age: 33 },
  //   { name: "Bob", email: "bob32@gmail.com", age: 41 },
  //   { name: "Ram", email: "ram@gmail.com", age: 23 },
  //   { name: "Shyam", email: "shyam23@gmail.com", age: 28 },
  //   { name: "John", email: "john@gmail.com", age: 33 },
  //   { name: "Bob", email: "bob32@gmail.com", age: 41 },
  //   { name: "Ram", email: "ram@gmail.com", age: 23 },
  //   { name: "Shyam", email: "shyam23@gmail.com", age: 28 },
  //   { name: "John", email: "john@gmail.com", age: 33 },
  //   { name: "Bob", email: "bob32@gmail.com", age: 41 },
  //   { name: "Ram", email: "ram@gmail.com", age: 23 },
  //   { name: "Shyam", email: "shyam23@gmail.com", age: 28 },
  //   { name: "John", email: "john@gmail.com", age: 33 },
  //   { name: "Bob", email: "bob32@gmail.com", age: 41 },
  // ];

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BookModel.AuthorsHint()
        .then((responseJson) => {
          setHints(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  return (
    <View>
       <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 24,
            alignSelf: "center",
            borderWidth: 1,
            padding: 15,
          }}
          onPress={()=>setModalVisible(true)}
        >
          {value}
        </Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <SearchableDropdown
            style={styles.searchableDropdown}
            onTextChange={(text) => setValue(text)}
            //On text change listner on the searchable input
            onItemSelect={(item) => {
              setValue(item.name);
              setModalVisible(false);
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ padding: 5, flexGrow: 1, width: "90%" }}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              paddingLeft: 12,
              fontSize: 24,
              flexGrow: 1,
              color: Constants.BLACK,
              backgroundColor: "transparent",
            }}
            itemStyle={{
              //single dropdown item style
              padding: 10,
              marginTop: 2,
              fontSize: 18,
              flexGrow: 1,
              width: "100%",
              color: Constants.BLACK,
              backgroundColor: "transparent",
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
              maxHeight: "90%",
            }}
            items={hints}
            //mapping of item array
            // defaultIndex={2}
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
              setModalVisible(false);
            }}
          ></Icon>
        </View>
      </Modal>
      {/* <Button title="Show modal" onPress={() => setModalVisible(true)} /> */}     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: "row",
    width: "80%",
    maxHeight: "90%",
    minHeight: "10%",
    marginTop: "10%",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: Constants.WHITE,
    opacity: 1,
    borderColor: Constants.LIGHTBLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingRight: 10,
  },
  searchableDropdown: {
    backgroundColor: "transparent",
    elevation: 1,
    width: "100%",
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
