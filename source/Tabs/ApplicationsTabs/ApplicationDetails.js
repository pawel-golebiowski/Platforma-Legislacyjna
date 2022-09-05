import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";

export function ApplicationDetails({ navigation, route }) {
  const apiUrl = useSelector((state) => state.urlReducer.url);
  const userToken = useSelector((state) => state.userReducer.token);
  const userId = useSelector((state) => state.userReducer.userId);

  const application = { ...route.params.applicationObj };
  const hasEnded = new Date() > new Date(application.endVoteDateTime);

  const [agreeSelected, setSelected] = useState(undefined);
  const [resultForm, resultFormSet] = useState(<></>);

  const voteApiUrl = apiUrl + "/api/Vote/voteForApplication";
  const getVotesSummaryUrl =
    apiUrl + "/api/Vote/getApplicationVoteSummary/" + application.id;
  const getVotesForApplication =
    apiUrl + "/api/Vote/getVotesForApplication/" + application.id;
  let alreadyVoted = false;
  let voteChoice;

  let voutingResult;
  let startCheck = () => {
    fetch(getVotesSummaryUrl)
      .then((response) => response.json())
      .then((votesSummary) => {
        fetch(getVotesForApplication)
          .then((response) => response.json())
          .then((votes) => {
            votes.forEach((element) => {
              if (element.userId == userId) {
                alreadyVoted = true;
                voteChoice = element.vote;
              }
            });
            voutingResult = votesSummary;
            if (hasEnded) {
              renderVoutingResult();
            } else renderVoutingForm();
          });
      });
  };
  startCheck();

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
    alert("Your choice: " + (agreeSelected ? "agree" : "disagree"));
    startCheck();
  };

  let openApplicationComment = (_id) => {
    navigation.navigate("Application Comments", {
      applicationObj: application,
    });
  };

  let showsAgreebutton = () => {
    if (alreadyVoted) {
      if (voteChoice === true) {
        return <Icon name="radio-button-checked" />;
      } else {
        return <Icon name="radio-button-unchecked" />;
      }
    } else if (agreeSelected) {
      return <Icon name="radio-button-checked" />;
    } else {
      return <Icon name="radio-button-unchecked" />;
    }
  };

  let showDisagreebutton = () => {
    if (alreadyVoted) {
      if (voteChoice === false) {
        return <Icon name="radio-button-checked" />;
      } else {
        return <Icon name="radio-button-unchecked" />;
      }
    } else if (agreeSelected === false) {
      return <Icon name="radio-button-checked" />;
    } else {
      return <Icon name="radio-button-unchecked" />;
    }
  };

  useEffect(() => {}, [voutingResult]);

  const renderVoutingResult = () => {
    if (voutingResult) {
      let agreePercent = voutingResult.votesFor / voutingResult.votesCount;
      resultFormSet(
        <>
          <View style={styles.segment}>
            <Text>Question:</Text>
            <Text>{application.question}</Text>
            <Text></Text>

            <View style={styles.voutingResultShow}>
              <Text>Answers:</Text>
              <Text>{voutingResult.votesCount}</Text>
            </View>
            <View style={styles.voutingResultShow}>
              <Text>Agree:</Text>
              <Text>{agreePercent.toString().slice(0, 4)}%</Text>
            </View>
          </View>
        </>
      );
    }
  };

  const renderVoutingForm = () => {
    resultFormSet(
      <>
        <View style={styles.segment}>
          <Text>Question:</Text>
          <Text>{application.question}</Text>
          <Pressable
            onPress={alreadyVoted ? () => {} : () => setSelected(true)}
            style={styles.voteOption}
          >
            {showsAgreebutton()}
            <Text>Agree</Text>
          </Pressable>
          <Pressable
            onPress={alreadyVoted ? () => {} : () => setSelected(false)}
            style={styles.voteOption}
          >
            {showDisagreebutton()}
            <Text>Disagree</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={submitVote}
          style={
            alreadyVoted ? styles.alreadyVoted : styles.pressableApplication
          }
        >
          <Text>{alreadyVoted ? "Already Voted" : "Submit"}</Text>
        </Pressable>
      </>
    );
  };

  return (
    <>
      <ScrollView>
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
              {application.endVoteDateTime.split("T")[0]}
              {application.endVoteDateTime.split("T")[1]}
            </Text>
            {hasEnded ? (
              <Text style={styles.warning}>Vouting has ended!</Text>
            ) : (
              <Text></Text>
            )}
          </View>
          {resultForm}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  voutingResultShow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  alreadyVoted: {
    backgroundColor: "#888888",
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
    alignSelf: "center",
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
