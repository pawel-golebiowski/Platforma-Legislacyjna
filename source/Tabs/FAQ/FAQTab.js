import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { HeaderComponent } from "../../../shared/HeaderComponent";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useDispatch, useSelector } from "react-redux";
import { updateFAQs } from "../../../shared/redux/actions";

export function FAQTab() {
  const [showAddQuestionDialog, showAddQuestionDialogSet] = useState(false);
  const [question, questionSet] = useState("");
  const [answer, answerSet] = useState("");

  const apiUrl = useSelector((state) => state.urlReducer.url);
  const getFAQsUrl = apiUrl + "/api/FAQ/getFAQs";
  const postFAQUrl = apiUrl + "/api/FAQ/createFAQ";

  const userToken = useSelector((state) => state.userReducer.token);
  const isAdmin = useSelector((state) => state.userReducer.isAdmin);

  let FAQs = [];
  FAQs = useSelector((state) => state.FAQreducer.FAQ);
  const dispatch = useDispatch();

  const postQuestion = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
        Accept: "application/json",
      },

      body: JSON.stringify({
        question: question,
        answer: answer,
      }),
    };
    fetch(postFAQUrl, requestOptions).then(() => {
      questionSet("");
      answerSet("");
      showAddQuestionDialogSet(false);
      alert("New FAQ added!");
      fetch(getFAQsUrl)
        .then((response) => response.json())
        .then((FAQdata) => {
          dispatch(updateFAQs(FAQdata));
          FAQs = FAQdata;
        });
    });
  };

  const addQuestionBtnClick = () => {
    if (showAddQuestionDialog) {
      if (question.length < 3) {
        alert("Question is too short. FAQ not created.");
      } else if (answer.length < 3) {
        alert("Answer is too short. FAQ not created.");
      } else postQuestion();
    } else showAddQuestionDialogSet(true);
  };

  let renderFAQs = () => {
    let recordFAQs = [];
    if (FAQs) {
      FAQs.map((question) => {
        return recordFAQs.push(
          <View key={question.id} style={styles.segment}>
            <View style={styles.bottomBorder}>
              <Text>{question.question}</Text>
            </View>
            <Text>{question.answer}</Text>
          </View>
        );
      });
    }
    return recordFAQs;
  };

  const closeQuestionDialog = () => {
    showAddQuestionDialogSet(false);
  };

  const renderAddQuestionDialog = () => {
    if (showAddQuestionDialog)
      return (
        <>
          <Pressable
            onPress={closeQuestionDialog}
            style={styles.closePostDialog}
          >
            <Icon name="close"></Icon>
          </Pressable>
          <Text style={styles.addPostLabel}>Question:</Text>
          <View style={styles.segmentInput}>
            <TextInput
              placeholder="Question"
              value={question}
              onChangeText={questionSet}
              style={styles.commentInput}
              multiline={true}
            />
          </View>
          <Text style={styles.addPostLabel}>Answer:</Text>

          <View style={styles.segmentInput}>
            <TextInput
              placeholder="Answer"
              multiline={true}
              value={answer}
              onChangeText={answerSet}
              style={styles.commentInput}
            />
          </View>
        </>
      );
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderComponent title="FAQ" />

        <ScrollView>
          {renderAddQuestionDialog()}
          {isAdmin ? (
            <Pressable
              onPress={addQuestionBtnClick}
              style={styles.pressableApplication}
            >
              <Text>
                {showAddQuestionDialog ? "Post question" : "Add question"}
              </Text>
            </Pressable>
          ) : (
            <Text></Text>
          )}
          <View style={styles.paddingBottom}>{renderFAQs()}</View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  paddingBottom: {
    paddingBottom: 30,
  },

  addPostLabel: {
    marginLeft: 6,
    alignSelf: "flex-start",
  },
  commentInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  segmentInput: {
    marginLeft: 5,
    marginBottom: 4,
    width: "90%",
    borderWidth: 1,
  },
  closePostDialog: {
    marginTop: 8,
    padding: 6,
    width: "90%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  voteOption: {
    flexDirection: "row",
    margin: 10,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    marginBottom: 8,
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
    marginBottom: 16,
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
