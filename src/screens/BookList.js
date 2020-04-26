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

import BookItem from "../components/BookItem";
import BookDetail from "../screens/BookDetail";


export default function BookList({ navigation }, props) {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(
      "http://192.168.1.101/bibliovale_test/BiblioValeApi.php?fName=getAllBooksBaseData"
    )
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
            <TouchableOpacity onPress={() => navigation.navigate('BookDetail', {item})}>
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
    backgroundColor: "#FEFEFE",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#616161",
    borderWidth: 1,
    overflow: "hidden",
  },
});
