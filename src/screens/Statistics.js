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
import * as Constants from "../storage/Constants";
import * as BookModel from "../models/BookModel";
import StatsTile from "../components/StatsTile";

export default function Statistics(props) {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { width } = Dimensions.get("window");
  const tileDimensions = calcTileDimensions(width, 2); // -> change this number and see!

  // const cStats =
  //   '[{"status":"Abbandonato","count":"5"},{"status":"da consultazione","count":"21"},{"status":"In lettura","count":"6"},{"status":"Letto","count":"295"},{"status":"non letto","count":"92"},{"status":"wish list","count":"35"},{"status":"Totale","count":"419"}]';
  // let jsonStats = JSON.parse(cStats);
  useEffect(() => {
    setIsLoading(true);
    BookModel.GetStats()
      .then((responseJson) => {
        setStats(responseJson);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsLoading(false);
  },[]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constants.GRAY }}>
      {
        <FlatList
          contentContainerStyle={styles.container}
          data={stats}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("BookDetail", { item });
                if(item.status.toUpperCase() != "TOTALE")
                  alert("Visualizza " + JSON.stringify(item));
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
    marginTop: 5,
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
