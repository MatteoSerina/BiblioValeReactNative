import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Constants from "../storage/Constants";
import * as BookModel from "../models/BookModel";
import StatsTile from "../components/StatsTile";

export default function Statistics(props) {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const { width } = Dimensions.get("window");
  const tileDimensions = calcTileDimensions(width, 2); // -> change this number and see!

   useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      refreshData();
      setIsLoading(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  
  function refreshData() {
    BookModel.GetStats()
      .then((responseJson) => {
        setStats(responseJson);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constants.GRAY }}>
      {
        <FlatList
          contentContainerStyle={styles.container}
          data={stats}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (item.status.toUpperCase() != "TOTALE")
                  navigation.navigate("StatList", { item });
              }}
            >
              <StatsTile
                stat={item}
                tileDimensions={tileDimensions}
              ></StatsTile>
            </TouchableOpacity>
          )}
          keyExtractor={({ status }) => status}
        />
      }
      {isLoading && (
        <View style={styles.spinner} pointerEvents={"none"}>
          <ActivityIndicator
            size={100}
            animating={isLoading}
            color={Constants.LIGHTBLUE}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.GRAY,
    marginTop: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  spinner: {
    position: "absolute",
    elevation: 1,
    opacity: 0.8,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: Constants.WHITE,
  },
});
