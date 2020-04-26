import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Picker } from "react-native";
import { Font } from "expo";

import * as Constants from "../storage/Constants";
import * as DbAdapter from "../storage/DbAdapter";

export default function StatusPicker(props) {
  const [status, setStatus] = useState([
    {
      "id": "1",
      "name": "Abbandonato"
    },
    {
      "id": "2",
      "name": "Da consultazione"
    },
    {
      "id": "3",
      "name": "In lettura"
    },
    {
      "id": "4",
      "name": "Letto"
    },
    {
      "id": "5",
      "name": "Non letto"
    },
    {
      "id": "6",
      "name": "Wish list"
    }
  ]);
  const [selectedStatus, setSelectedStatus] = useState(props.status);
  
  return (
    <View>
      <Picker
        selectedValue={selectedStatus}
        style={props.style}
        onValueChange={(itemValue, itemIndex) => setSelectedStatus(itemValue)}
      >
        {
          status.map((item,key) => (
            <Picker.Item label={item.name} value={item.name} key={key} />
          ))
        }
      </Picker>
    </View>
  )
}
