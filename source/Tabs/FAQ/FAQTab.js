import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { HeaderComponent } from "../../../shared/HeaderComponent";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useSelector } from "react-redux";

export function FAQTab() {
  let FAQs = [];
  FAQs = useSelector((state) => state.FAQreducer.FAQ);

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

  return (
    <>
      <View style={styles.container}>
        <HeaderComponent title="FAQ" />
        <ScrollView>
          {renderFAQs()}
          <Pressable style={styles.pressableApplication}>
            <Text>Add question</Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 30,
  },
  segmentCenter: {
    width: "90%",
    padding: 10,
    margin: 5,
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
