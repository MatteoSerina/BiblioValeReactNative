import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";

import * as BookModel from "../models/BookModel";
import BookList from "../components/BookList";

export default function SearchBookResult(props) {
  const navigation = useNavigation();
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      BookModel.SearchBook(props.route.params.queryString)
        .then((responseJson) => {
          setDataSource(responseJson);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
      setIsLoading(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },);

  function refreshData() {
    BookModel.SearchBook(props.route.params.queryString)
      .then((responseJson) => {
        setDataSource(responseJson);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View>
      <BookList
        bookList={dataSource}
        navigation={navigation}
        refreshList={refreshData}
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
