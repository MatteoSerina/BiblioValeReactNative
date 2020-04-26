import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import { Font } from "expo";

function MaterialRightIconTextbox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        placeholder="Cerca un libro"
        autoFocus={false}
        editable={true}
        clearButtonMode="never"
        style={styles.inputStyle}
      ></TextInput>
      <Icon name="search" style={styles.iconStyle}></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#616161",
    borderWidth: 1,
    borderRadius: 10
  },
  inputStyle: {
    flex: 1,
    color: "#616161",
    paddingLeft: 16,
    fontSize: 24,   
    // fontFamily: "roboto-regular"
  },
  iconStyle: {
    color: "#616161",
    fontSize: 36,
    paddingRight: 8
  }
});

export default MaterialRightIconTextbox;
