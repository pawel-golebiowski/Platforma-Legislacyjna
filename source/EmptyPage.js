import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function EmptyPage() {
  return (
    <View style={styles.container}>
      <Text>This is empty page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
