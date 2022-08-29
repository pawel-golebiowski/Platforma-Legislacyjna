import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderComponent } from "../../shared/HeaderComponent";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export function FAQTab() {
  return (
    <>
      <View style={styles.container}>
        <HeaderComponent title="FAQ" />
        <Text>Do you have any other questions?</Text>
        <Pressable style={styles.pressableApplication}>
          <Text>Ask administrator</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  voteOption: {
    flexDirection: "row",
    margin: 10,
  },

  pressableApplication: {
    backgroundColor: "#2089DC",
    padding: 6,
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  segmentCenter: {
    width: "90%",
    padding: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  segment: {
    width: "90%",
    padding: 10,
    margin: 5,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
