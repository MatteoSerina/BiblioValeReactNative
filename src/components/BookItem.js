import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Font } from "expo";

function BookItem(props) {
    return (
      <View style={[styles.container, props.style]}>
        <View style={styles.cardBody}>
          <View style={styles.bodyContent}>
            <Text style={styles.titleStyle}>{props.book.title}</Text>
            <Text style={styles.authorStyle}>{props.book.surname}, {props.book.name}</Text>
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
      backgroundColor: "#FEFEFE",
      flexWrap: "nowrap",
      elevation: 1,
      borderRadius: 2,
      borderColor: "#616161",
      borderWidth: 1,
      margin: 5,
      overflow: "hidden"
    },
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    bodyContent: {
      flex: 1,
      padding: 16,
      paddingTop: 24
    },
    titleStyle: {
      color: "rgba(74,144,226,1)",
      paddingBottom: 12,
      fontSize: 24,
    //   fontFamily: "roboto-regular"
    },
    authorStyle: {
      color: "#616161",
      opacity: 0.9,
      fontSize: 18,
    //   fontFamily: "roboto-regular",
    },
    statusStyle: {
        color: "#616161",
        opacity: 0.5,
        fontSize: 14,
        fontStyle: 'italic',
        // fontFamily: "roboto-regular",
      },
    cardItemImagePlace: {
      width: 80,
      height: 80,
      backgroundColor: "#616161",
      margin: 16
    }
  });
  
  export default BookItem;
  