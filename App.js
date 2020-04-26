import React from "react";
import { StyleSheet, Text, View } from "react-native";

import DrawerNavigator from "./src/navigators/DrawerNavigator";

export default function App() {
  return  <DrawerNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
