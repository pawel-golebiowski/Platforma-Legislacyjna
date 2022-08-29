import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import { useSelector } from "react-redux";
import { HeaderComponent } from "../../../shared/HeaderComponent";
import { Icon } from "react-native-elements";

export function ApplicationsHomeScreen({ navigation }) {
  let self = this;
  const apiUrl = useSelector((state) => state.urlReducer.url);
  let applications = [];
  applications = useSelector((state) => state.applicationReducer.applications);

  let addNewApplication = () => {
    navigation.navigate("AddApplication");
  };

  let openApplication = (_id) => {
    navigation.navigate("ApplicationDetails", { id: _id });
  };

  let renderApplications = () => {
    let recordApplications = [];
    applications.map((record) => {
      return recordApplications.push(
        <Pressable
          key={record.id}
          onPress={() => {
            openApplication(record.id);
          }}
          style={styles.pressableApplication}
        >
          <Text>{record.title}</Text>
        </Pressable>
      );
    });
    return recordApplications;
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderComponent title="Applications Screen" />
        {renderApplications()}

        <Pressable onPress={addNewApplication} style={styles.btnAddApplication}>
          <Icon name="add" type="ionicon"></Icon>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
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
  pressableApplication: {
    backgroundColor: "#2089DC",
    padding: 6,
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
