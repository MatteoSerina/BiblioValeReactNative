import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BookList from "../screens/BookList";
import BookDetail from "../screens/BookDetail";

const Stack = createStackNavigator();

function BookListDetailStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookList"
        component={BookList}
        options={{ title: "Elenco" }}
      />
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
}

export default function BookDetailNavigator() {
  return (
    <NavigationContainer>
      <BookListDetailStack />
    </NavigationContainer>
  );
}
