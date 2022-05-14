import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderComponent } from "../../shared/HeaderComponent";

export function CalendarTab() {
  return (
    <>
      <View style={styles.container}>
        <HeaderComponent />
        <Text>Calendar Tab</Text>
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
