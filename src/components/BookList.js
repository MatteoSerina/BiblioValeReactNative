import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Constants from "../storage/Constants";

import BookItem from "./BookItem";

export default function BookList(props) {
  let bookList = props.bookList;
  let navigation = props.navigation;

  const [dataSource, setDataSource] = useState(bookList);
  const [isLoading] = useState(false);

  useEffect(() => {
    setDataSource(bookList);
  }, );

  return (
    <SafeAreaView style={[styles.container, props.style]}>
      {        
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BookDetail", { item });
              }}
            >
              <BookItem book={item}></BookItem>
            </TouchableOpacity>
          )}
          keyExtractor={({ id }) => id}
        />
      }
      {isLoading && (
        <View style={styles.spinner} pointerEvents={"none"}>
          <ActivityIndicator
            size={100}
            animating={isLoading}
            color={Constants.LIGHTBLUE}
          />
        </View>
      )}
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
