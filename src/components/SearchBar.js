import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Octicons";
import SearchableDropdown from "react-native-searchable-dropdown";
import * as Constants from "../storage/Constants";
import * as BookModel from "../models/BookModel";

function SearchBar(props) {
  const [queryString, setQuerystring] = useState("");
  const [hints, setHints] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BookModel.SearchHint()
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
    <View style={[styles.container]}>
      <SearchableDropdown
        style={styles.searchableDropdown}
        onTextChange={(text) => setQuerystring(text)}
        //On text change listner on the searchable input
        onItemSelect={(item) => {
          setQuerystring(item.name);
        }}
        //onItemSelect called after the selection from the dropdown
        containerStyle={{ padding: 5, flexGrow: 1, width: "90%" }}
        //suggestion container style
        textInputStyle={{
          //inserted text style
          padding: 12,
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
        itemsContainerStyle={
          {
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: "90%"
          }
        }
        items={hints}
        //mapping of item array
        defaultIndex={2}
        //default selected item index
        placeholder="Cerca un libro"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input               
      />
      <Icon
        name="search"
        style={styles.iconStyle}
        onPress={() => {
          if(queryString != "")
            props.navigation.navigate("SearchBookResult", { queryString });
        }}
      ></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderColor: Constants.LIGHTBLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingRight: 10
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
    paddingTop: 16,
    marginRight: 8
  },
});

export default SearchBar;
