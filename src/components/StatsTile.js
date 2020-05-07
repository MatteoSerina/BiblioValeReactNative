import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Asset } from "expo-asset";
import { Font } from "expo";
import * as Constants from "../storage/Constants";

export default function StatsTile(props) {
  let currentStat = props.stat;
  let tileSize = props.tileDimensions.size;
  let tileMargin = props.tileDimensions.margin;

  return (
    <View
      style={[
        styles.tile,
        {
          width: tileSize,
          height: tileSize,
          marginHorizontal: tileMargin,
          marginVertical: 0.5 * tileMargin,
        },
      ]}
    >
      <Text
        style={[
          styles.counter,
          currentStat.status.toUpperCase() == "TOTALE"
            ? styles.totalCounter
            : styles.baseCounter,
        ]}
      >
        {currentStat.count}
      </Text>
      <Text style={[styles.status,
          currentStat.status.toUpperCase() == "TOTALE"
            ? styles.totalStatus
            : styles.baseStatus,]}>{Capitalize(currentStat.status)}</Text>
    </View>
  );
}

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: Constants.WHITE,
    elevation: 5,
    borderRadius: 2,
    borderColor: Constants.GRAY,
    borderWidth: 1,
    justifyContent: "center",
    flex: 1,
  },
  counter: {
    color: Constants.LIGHTBLUE,
    fontSize: 64,
    textAlign: "left",
    paddingLeft: 10,
    flex: 0.7,
  },
  baseCounter: {
    fontStyle: "normal",
  },
  totalCounter: {
    fontStyle: "italic",
    fontSize: 72
  },
  status: {
    color: Constants.BLACK,
    opacity: 0.9,
    fontSize: 20,
    textAlign: "right",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  baseStatus: {
    fontStyle: "normal",
  },
  totalStatus: {
    fontStyle: "italic",
    fontSize: 26
  },
});
