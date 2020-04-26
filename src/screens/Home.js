import React, { Component } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { Font } from "expo";
import * as Constants from '../storage/Constants';
import MaterialButtonNewBook from "../components/MaterialButtonNewBook";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";

function Home(props) {
  return (
    <View style={styles.container}>
      <View style={styles.biblioValeColumn}>
        <Text style={styles.title}>BiblioVale</Text>
      </View>
      <View style={styles.biblioValeColumnFiller}>
        <MaterialRightIconTextbox
          style={styles.materialRightIconTextbox}
        ></MaterialRightIconTextbox>
      </View>
      <View style={styles.newBookView}>
        <MaterialButtonNewBook
          style={styles.materialButtonNewBook}
        ></MaterialButtonNewBook>
      </View>
      <StatusBar
        animated={true}
        barStyle="light-content"
        hidden={false}
      ></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.WHITE,
  },
  title: {
    color: Constants.LIGHTBLUE,
    fontSize: 64,
    // fontFamily: "abeezee-regular"
  },
  newBookView: {
    paddingLeft: "70%",
    marginBottom: "3%",
  },
  materialButtonNewBook: {},
  biblioValeColumn: {
    flex: 1,
    flexDirection: "column",
    marginTop: "10%",
  },
  materialRightIconTextbox: {
    height: "30%",
    justifyContent: "center",
  },
  biblioValeColumnFiller: {
    flex: 1,
    flexDirection: "column",
    width: "90%",
    marginBottom: "10%",
  },
});

export default Home;
