import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialButtonNewBook(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Icon name="plus-circle-outline" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(74,144,226,1)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    minWidth: 64,
    minHeight: 64,
    borderRadius: 64,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#D9D5DC",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  icon: {
    color: "#FEFEFE",
    // fontFamily: "Roboto",
    fontSize: 36,
    alignSelf: "center"
  }
});

export default MaterialButtonNewBook;
