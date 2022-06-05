import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderComponent } from "../../../shared/HeaderComponent";

export function ForumHomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <HeaderComponent title="Forum" />
        <Text>ForumHomeScree111n</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
