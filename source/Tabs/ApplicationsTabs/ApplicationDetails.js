import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";

export function ApplicationDetails({ navigation, route }) {
  const apiUrl = useSelector((state) => state.urlReducer.url);
  const userToken = useSelector((state) => state.userReducer.token);

  const application = { ...route.params.applicationObj };

  const voteApiUrl = apiUrl + "/api/Vote/voteForApplication";
  console.log(voteApiUrl);

  const [agreeSelected, setSelected] = useState(undefined);
  let submitVote = () => {
    if (agreeSelected === undefined) {
      alert("To submit your voting please select your choice");
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
          Accept: "application/json",
        },

        body: JSON.stringify({
          applicationId: application.id,
          vote: agreeSelected,
        }),
      };

      fetch(voteApiUrl, requestOptions);
    }
    console.log("submit!");
    console.log("Your choice:", agreeSelected);
  };

  let openApplicationComment = (_id) => {
    navigation.navigate("Application Comments", {
      applicationObj: application,
    });
  };

  let showsAgreebutton = () => {
    if (agreeSelected) {
      return <Icon name="radio-button-checked" />;
    } else {
      return <Icon name="radio-button-unchecked" />;
    }
  };

  let showDisagreebutton = () => {
    console.log("agreeSelected : ", agreeSelected);
    if (agreeSelected === false) {
      return <Icon name="radio-button-checked" />;
    } else {
      return <Icon name="radio-button-unchecked" />;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.segmentTitle}>
          <Text style={styles.textBold}>{application.title}</Text>
        </View>
        <View style={styles.segment}>
          <Text>Description:</Text>
          <Text>{application.body}</Text>
        </View>
        <Pressable
          onPress={openApplicationComment}
          style={styles.pressableApplication}
        >
          <Text>Comments</Text>
        </Pressable>
        <View style={styles.segment}>
          <Text>End date of voting:</Text>
          <Text>
            {application.endVoteDateTime.split("T")[0]}{" "}
            {application.endVoteDateTime.split("T")[1]}
          </Text>
        </View>
        <View style={styles.segment}>
          <Text>Question:</Text>
          <Text>{application.question}</Text>
          <Pressable
            onPress={() => setSelected(true)}
            style={styles.voteOption}
          >
            {showsAgreebutton()}
            <Text>Agree</Text>
          </Pressable>
          <Pressable
            onPress={() => setSelected(false)}
            style={styles.voteOption}
          >
            {showDisagreebutton()}
            <Text>Disagree</Text>
          </Pressable>
        </View>
        <Pressable onPress={submitVote} style={styles.pressableApplication}>
          <Text>Submit</Text>
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
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
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
  segmentTitle: {
    width: "90%",
    padding: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  warning: {
    color: "red",
    fontWeight: "bold",
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
