import React, { Component, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as Constants from "../storage/Constants";

function MaterialButtonNewBook(props) {
  const navigation = useNavigation();

  
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={() => {        
        navigation.navigate("BookDetail", {item: JSON.parse(JSON.stringify(Constants.EMPTY_BOOK))});
      }}
    >
      <Icon name="plus-circle-outline" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.LIGHTBLUE,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    minWidth: 64,
    minHeight: 64,
    borderRadius: 64,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowColor: Constants.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
  },
  icon: {
    color: Constants.WHITE,
    fontSize: 36,
    alignSelf: "center",
  },
});

export default MaterialButtonNewBook;
