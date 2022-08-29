import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { HeaderComponent } from "../../../shared/HeaderComponent";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native";

export function AddApplication() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Question</Text>
          <TextInput placeholder="Question" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput placeholder="description" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>End date</Text>
          <TextInput placeholder="end date" style={styles.input} />
        </View>
        <Pressable style={styles.pressableApplication}>
          <Text>AddApplication</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    marginBottom: 4,
  },
  btnAddApplication: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#FF4081",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",

    marginTop: 16,
  },
  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    padding: 10,
  },
  pressableApplication: {
    backgroundColor: "#2089DC",
    padding: 6,
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    paddingLeft: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
