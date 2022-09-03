import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import { useSelector } from "react-redux";
import { HeaderComponent } from "../../../shared/HeaderComponent";
import { Icon } from "react-native-elements";

export function ApplicationsHomeScreen({ navigation }) {
  const apiUrl = useSelector((state) => state.urlReducer.url);
  let applications = [];
  applications = useSelector((state) => state.applicationReducer.applications);

  let addNewApplication = () => {
    navigation.navigate("Add Application");
  };

  let openApplication = (application) => {
    navigation.navigate("Application Details", {
      applicationObj: application,
    });
  };

  let renderApplications = () => {
    let recordApplications = [];
    if (applications) {
      applications.map((record) => {
        return recordApplications.push(
          <Pressable
            key={record.id}
            onPress={() => {
              openApplication(record);
            }}
            style={styles.pressableApplication}
          >
            <Text>{record.title}</Text>
          </Pressable>
        );
      });
    }

    return recordApplications;
  };

  return (
    <>
      <HeaderComponent title="Applications Screen" />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>{renderApplications()}</View>
      </ScrollView>
      <Pressable onPress={addNewApplication} style={styles.btnAddApplication}>
        <Icon name="add" type="ionicon"></Icon>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  btnAddApplication: {
    position: "absolute",
    bottom: 20,
    right: 20,
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
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    height: 400,
  },
});
