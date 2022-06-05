import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderComponent } from "../../../shared/HeaderComponent";

export function ApplicationsHomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <HeaderComponent title="Applications Screen" />
        <Text>ApplicatioasdasnsHomeScreen</Text>
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
