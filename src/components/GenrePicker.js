import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Picker } from "react-native";
import { Font } from "expo";

import * as Constants from "../storage/Constants";
import * as DbAdapter from "../storage/DbAdapter";

export default function GenrePicker(props) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(props.genre);

  useEffect(() => {
    DbAdapter.GetAllGenres()
      .then((response) => response.json())
      .then((responseJson) => {
        setGenres(responseJson);
        console.warn(props.style)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Picker
        selectedValue={selectedGenre}
        style={props.style}
        onValueChange={(itemValue, itemIndex) => setSelectedGenre(itemValue)}
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
