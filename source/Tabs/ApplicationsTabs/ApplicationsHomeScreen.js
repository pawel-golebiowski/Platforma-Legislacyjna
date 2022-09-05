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

  const compareEndDate = (a, b) => {
    if (a.endVoteDateTime > b.endVoteDateTime) return -1;
    if (a.endVoteDateTime === b.endVoteDateTime) return 0;
    if (a.endVoteDateTime < b.endVoteDateTime) return 1;
  };

  let renderApplications = () => {
    let recordApplications = [];
    if (applications) {
      applications.sort(compareEndDate);
      applications.map((record) => {
        const today = new Date();
        const endDate = new Date(record.endVoteDateTime);
        const hasEnded = endDate < today;
        return recordApplications.push(
          <Pressable
            key={record.id}
            onPress={() => {
              openApplication(record);
            }}
            style={
              hasEnded
                ? styles.pressableEndedApplication
                : styles.pressableApplication
            }
          >
            <Text style={styles.textBold}>{record.title}</Text>
            <Text style={styles.endVoteDateTime}>End time:</Text>
            <Text style={styles.endVoteDateTime}>
              {record.endVoteDateTime.split("T")[0]}{" "}
              {record.endVoteDateTime.split("T")[1]}
            </Text>
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
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  endVoteDateTime: {
    marginLeft: 8,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
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
    maxHeight: 120,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  pressableEndedApplication: {
    backgroundColor: "#777777",
    padding: 6,
    maxHeight: 120,
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
