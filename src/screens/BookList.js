import "react-native-gesture-handler";
import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import { Font } from "expo";
import * as Constants from "../storage/Constants";

import * as DbAdapter from "../storage/DbAdapter";
import BookItem from "../components/BookItem";
import BookDetail from "../screens/BookDetail";

export default function BookList({ navigation }, props) {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    DbAdapter.GetAllBooks()
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(true);
        setDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <SafeAreaView style={[styles.container, props.style]}>
      {
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("BookDetail", { item })}
            >
              <BookItem book={item}></BookItem>
            </TouchableOpacity>
          )}
          keyExtractor={({ id }, index) => id}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.GRAY,
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    overflow: "hidden",
  },
});
