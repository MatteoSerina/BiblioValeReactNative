import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Font } from "expo";
import * as Constants from "../storage/Constants";

function BookItem(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>{props.book.title}</Text>
          <Text style={styles.authorStyle}>
            {props.book.surname}, {props.book.name}
          </Text>
          <Text style={styles.statusStyle}>{props.book.status}</Text>
        </View>
        <Image
          source={require("../../assets/img/cover_not_found.png")}
          style={styles.cardItemImagePlace}
        ></Image>
      </View>
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
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContent: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  titleStyle: {
    color: Constants.LIGHTBLUE,
    paddingBottom: 12,
    fontSize: 24,
    //   fontFamily: "roboto-regular"
  },
  authorStyle: {
    color: Constants.BLACK,
    opacity: 0.9,
    fontSize: 18,
    //   fontFamily: "roboto-regular",
  },
  statusStyle: {
    color: Constants.BLACK,
    opacity: 0.5,
    fontSize: 14,
    fontStyle: "italic",
    // fontFamily: "roboto-regular",
  },
  cardItemImagePlace: {
    width: "30%",
    height: "80%",
    flex: 0.3,
    resizeMode: "contain",
    backgroundColor: Constants.WHITE,
    marginRight: 16,
    marginTop: 16
  },
});

export default BookItem;
