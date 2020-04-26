import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Font } from "expo";

function Capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function BookDetail(props) {
  let currentBook = props.route.params.item;
  
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.titleStyle}>{currentBook.title}</Text>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.authorStyle}>
            {Capitalize(currentBook.surname)}, {Capitalize(currentBook.name)}
          </Text>          
          <Text style={styles.mainInfoStyle}>{Capitalize(currentBook.genre)}</Text>
          <Text style={styles.mainInfoStyle}>{Capitalize(currentBook.status)}</Text>
          <Text style={styles.secondaryInfoStyle}>Anno: {currentBook.year == '0'? '' : currentBook.year}</Text>
          <Text style={styles.secondaryInfoStyle}>ISBN10: {currentBook.isbn10}</Text>
          <Text style={styles.secondaryInfoStyle}>ISBN13: {currentBook.isbn13}</Text>
        </View>        
      </View>
      <Image
          source={require("../../assets/img/cover_not_found.png")}
          style={styles.cardItemImagePlace}
        ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEFEFE",
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 2,
    borderColor: "#616161",
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "column",
    flex: 1,
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
    color: "rgba(74,144,226,1)",
    paddingBottom: 12,
    paddingTop: 12,
    fontSize: 28,
    alignSelf: "center",
    textAlign: "center"
    //   fontFamily: "roboto-regular"
  },
  authorStyle: {
    color: "#616161",
    opacity: 1,
    fontSize: 24,
    marginBottom: 5
    //   fontFamily: "roboto-regular",
  },
  mainInfoStyle: {
    color: "#616161",
    opacity: 1,
    fontSize: 22,
    fontStyle: "italic",
    marginBottom: 5
    //   fontFamily: "roboto-regular",
  },
  secondaryInfoStyle: {
    color: "#616161",
    opacity: 0.7,
    fontSize: 14,
    marginTop: 5   
    // fontFamily: "roboto-regular",
  },
  cardItemImagePlace: {
    width: '50%',
    backgroundColor: "#616161",
    margin: 16,
    alignSelf: "center"
  },
});
