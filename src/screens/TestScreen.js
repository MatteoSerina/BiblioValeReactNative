import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ModalFilterPicker from "react-native-modal-filter-picker";
import * as Constants from "../storage/Constants";

export default function TestScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [picked, setPicked] = useState("");
  useEffect(() => {}, []);

  const options = [
    {
      key: "kenya",
      label: "Kenya",
    },
    {
      key: "uganda",
      label: "Uganda",
    },
    {
      key: "libya",
      label: "Libya",
    },
    {
      key: "morocco",
      label: "Morocco",
    },
    {
      key: "estonia",
      label: "Estonia",
    },
  ];

  function onShow() {
    setVisible(true);
  }

  function onSelect(picked) {
    setPicked(picked);
    setVisible(false);
  }

  function onCancel() {
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => onShow()}>
        <Text style={styles.button}>Select country</Text>
      </TouchableOpacity>
      <Text style={styles.picked}>Selected: {picked === undefined ? "" : picked.label}</Text>
      <ModalFilterPicker
        visible={visible}
        overlayStyle={styles.overlayStyle}
        listContainerStyle={styles.listContainerStyle}
        placeholderText="Cognome, nome"
        cancelButtonText="Annulla"
        noResultsText="Autore inesistente"
        onSelect={(pickedVal) => onSelect(pickedVal)}
        onCancel={() => onCancel()}
        options={options}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constants.WHITE,
  },
  barcode: { borderWidth: 1, width: "90%", margin: 16 },
  button: {
    fontSize: 40,
    textAlign: "center"
  },
  buttonContainer: {
    justifyContent: "center",
    height: "20%",
    width: "50%",
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
    borderWidth: 2,
    margin: 30,
  },
  picked:{
    margin:30,
    fontSize: 20
  },
  overlayStyle:{
    margin: 30,
    width: "80%",
    height: "80%",
    borderWidth: 2,
  },
  listContainerStyle:{
    borderWidth: 3,
    elevation: 1,
    flex: 1,
    
  }
});
