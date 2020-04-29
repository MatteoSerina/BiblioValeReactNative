import React, { Component, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { Font } from "expo";
import * as Constants from "../storage/Constants";

function GetMessage(apiDescription) {
  let messageDictionary = {};
  messageDictionary["Book updated"] = "Salvataggio completato";
  messageDictionary["Author does not exists!"] = "Autore inesistente";

  return messageDictionary[apiDescription] === undefined
    ? apiDescription
    : messageDictionary[apiDescription];
}

export default function ModelNotify(props) {
  return (
    <View>
      <Dialog
        onDismiss={() => props.closeDialog()}
        onTouchOutside={() => props.closeDialog()}
        width={0.9}
        visible={props.isDialogOn}
        rounded
        dialogTitle={
          <DialogTitle
            title={props.response.status_id == "0" ? props.title : "Errore"}
            bordered={false}
            style={styles.title}
          ></DialogTitle>
        }
        footer={
          <DialogFooter>
            <DialogButton
              text="Chiudi"
              onPress={() => props.closeDialog()}
              key="close"
              bordered={false}
            ></DialogButton>
          </DialogFooter>
        }
      >
        <DialogContent bordered={false}>
          <Text style={styles.content}>
            {GetMessage(props.response.status_desc)}
          </Text>
        </DialogContent>
      </Dialog>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  content: {
    backgroundColor: Constants.WHITE,
    textAlign: "center",
    fontSize: 16,
    alignContent: "center",
  },
});
