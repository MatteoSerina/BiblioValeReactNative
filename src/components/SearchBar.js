import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Octicons";

function SearchBar(props) {
  const [queryString, setQuerystring] = useState("");
  const navigation = useNavigation();

  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        placeholder="Cerca un libro"
        autoFocus={false}
        editable={true}
        clearButtonMode="never"
        onChangeText={newText => setQuerystring(newText)}
        onSubmitEditing={() => {
          props.navigation.navigate("SearchBookResult", { queryString });
        }}
        style={styles.inputStyle}
      ></TextInput>
      <Icon
        name="search"
        style={styles.iconStyle}
        onPress={() => {
          props.navigation.navigate("SearchBookResult", { queryString });
        }}
      ></Icon>
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
    borderRadius: 10,
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
    paddingRight: 8,
  },
});

export default SearchBar;