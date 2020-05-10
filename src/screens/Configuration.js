import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Constants from "../storage/Constants";

async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Key: " + key + " Value: " + value + " Stored");
  } catch (error) {
    console.warn(error);
  }
}

async function retrieveData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      // console.log(value);
      return value;
    }
  } catch (error) {
    console.warn(error);
  }
}

export default function Configuration({ navigation }) {
  const [endpoint, setEndpoint] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      retrieveData(Constants.DB_URL_LSKEY).then((data) => setEndpoint(data));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  function SaveData(){
    storeData(Constants.DB_URL_LSKEY,endpoint);
    Alert.alert("Configurazione", "Configurazioni salvate");
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
      <View style={styles.configParameter}>
        <Text style={styles.key}>Endpoint:</Text>
        <TextInput
          style={styles.value}
          placeholder="Endpoint URL"
          onChangeText={(newText) => setEndpoint(newText)}
        >
          {endpoint}
        </TextInput>
      </View>
      </View>
      <TouchableOpacity style={styles.saveButtonContainer} onPress={() => SaveData()}>
        <Icon name="md-save" style={styles.saveButton} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.WHITE,
  },
  configParameter: {
    elevation: 3,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Constants.GRAY,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  key: {
    color: Constants.BLACK,
    fontSize: 25,
    padding: 5,
  },
  value: {
    color: console.BLACK,
    fontSize: 20,
    padding: 5,
  },
  saveButtonContainer:{
    justifyContent: "center",
    width: "33%",
    marginLeft:"33%",
    flex:0.15
  },
  saveButton: {
    borderColor: Constants.LIGHTBLUE,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 48,
    textAlign: "center",
    color: Constants.LIGHTBLUE,
    padding: 5,
  },
});
