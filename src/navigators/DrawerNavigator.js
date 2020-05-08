import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { useSafeArea } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Constants from "../storage/Constants";

import Home from "../screens/Home";
import Library from '../screens/Library';
import SearchBookResult from '../screens/SearchBookResult';
import BookDetail from '../screens/BookDetail';
import TestScreen from '../screens/TestScreen';
import Statistics from '../screens/Statistics';
import StatList from '../screens/StatsList';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ drawerPosition, navigation }) {
  const insets = useSafeArea();
  return (
    <ScrollView
      contentContainerStyle={[
        {
          paddingTop: insets.top + 4,
          paddingLeft: drawerPosition === "left" ? insets.left : 0,
          paddingRight: drawerPosition === "right" ? insets.right : 0,
        },
      ]}
      style={styles.container}
    >
      <DrawerItem
        label="Home"
        labelStyle={styles.menuItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <DrawerItem
        label="Nuovo libro"
        labelStyle={styles.menuItem}
        onPress={() => {
          navigation.navigate("BookDetail", {item: JSON.parse(JSON.stringify(Constants.EMPTY_BOOK))});
        }}
      />
      <DrawerItem
        label="Catalogo"
        labelStyle={styles.menuItem}
        onPress={() => {
          navigation.navigate("Library");
        }}
      />
      <DrawerItem
        label="Statistiche"
        labelStyle={styles.menuItem}
        onPress={() => {
          navigation.navigate("Statistics");
        }}
      />
      <DrawerItem
        label="Configurazione"
        labelStyle={styles.menuItem}
        onPress={() => {
          navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label="Test screen"
        onPress={() => {
          navigation.navigate("TestScreen");
        }}
      />
    </ScrollView>
  );
}
export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home}  />
        <Drawer.Screen name="Library" component={Library}/>
        <Drawer.Screen name="BookDetail" component={BookDetail}/>
        <Drawer.Screen name="SearchBookResult" component={SearchBookResult}/>
        <Drawer.Screen name="Statistics" component={Statistics}/>
        <Drawer.Screen name="StatList" component={StatList}/>
        <Drawer.Screen name="TestScreen" component={TestScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 18
  },
  menuItem:{
    fontSize: 24,
    color: Constants.BLACK
  }
});
