import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Picker } from "react-native";
import { Font } from "expo";

import * as Constants from "../storage/Constants";
import * as DbAdapter from "../storage/DbAdapter";

export default function GenrePicker(props) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    DbAdapter.GetAllGenres()
      .then((response) => response.json())
      .then((responseJson) => {
        setGenres(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Picker
        selectedValue={props.selectedGenre}
        style={props.style}
        onValueChange={(itemValue, itemIndex) => props.onChangeVal(itemValue, itemIndex)}
      >
        {
          genres.map((item,key) => (
            <Picker.Item label={item.name} value={item.name} key={key} />
          ))
        }
      </Picker>
    </View>
  )
}
