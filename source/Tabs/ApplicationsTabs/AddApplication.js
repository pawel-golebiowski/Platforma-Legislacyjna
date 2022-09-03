import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { updateApplications } from "../../../shared/redux/actions";

export function AddApplication({ navigation, route }) {
  const apiUrl = useSelector((state) => state.urlReducer.url);
  const createApplicationUrl = apiUrl + "/api/Application/createApplication";
  const getApplicationsUrl = apiUrl + "/api/Application/getApplications";

  const userToken = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [endVoteDate, setEndVoteDate] = useState("");
  const [endVoteTime, setEndVoteTime] = useState("");

  const [titleError, titleErrorSet] = useState("");
  const [questionError, questionErrorSet] = useState("");
  const [dateError, dateErrorSet] = useState("");
  const [timeError, timeErrorSet] = useState("");

  const [timePickerFlag, setTimePickerFlag] = useState("hide");
  const [datePickerFlag, setDatePickerFlag] = useState("hide");

  const createNewApplication = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
        Accept: "application/json",
      },

      body: JSON.stringify({
        title: title,
        body: description,
        question: question,
        endVotingDateTime: endVoteDate + "T" + endVoteTime,
      }),
    };

    fetch(createApplicationUrl, requestOptions).then(() => {
      fetch(getApplicationsUrl)
        .then((response) => response.json())
        .then((applicationData) => {
          dispatch(updateApplications(applicationData));
        });
    });
  };

  Date.prototype.getStringDate = function () {
    let mm = this.getMonth() + 1;
    let dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ].join("-");
  };

  Date.prototype.getStringTime = function () {
    let hh = this.getHours() + 4;
    let mm = this.getMinutes();
    let ss = "00";

    return [(hh > 9 ? "" : "0") + hh, (mm > 9 ? "" : "0") + mm, ss].join(":");
  };

  let getMinDate = () => {
    let today = new Date();
    let newDate = new Date(today.setDate(today.getDate() + 7));
    return newDate;
  };

  let changeEndTime = (timeObj, timestamp) => {
    setTimePickerFlag("hide");
    if (timestamp) {
      setEndVoteTime(timestamp.getStringTime());
    }
  };

  let changeEndDate = (dateObj, timestamp) => {
    setDatePickerFlag("hide");
    if (timestamp) {
      setEndVoteDate(timestamp.getStringDate());
    }
  };

  let showDatePicker = () => {
    if (datePickerFlag === "show") {
      return (
        <DateTimePicker
          onChange={(dateObj, timestamp) => changeEndDate(dateObj, timestamp)}
          value={new Date()}
          mode="date"
          minimumDate={getMinDate()}
        />
      );
    }
  };

  let showTimePicker = () => {
    if (timePickerFlag === "show") {
      return (
        <DateTimePicker
          onChange={(timeObj, timestamp) => changeEndTime(timeObj, timestamp)}
          value={new Date()}
          timeZoneOffsetInMinutes={240}
          mode="time"
          is24Hour={true}
        />
      );
    }
  };

  useEffect(() => {
    validateTilte();
  }, [title]);

  useEffect(() => {
    validateQuestion();
  }, [question]);

  useEffect(() => {
    dateErrorSet("");
  }, [endVoteDate]);

  useEffect(() => {
    timeErrorSet("");
  }, [endVoteTime]);

  let submitForm = () => {
    let isError = false;
    if (title.length < 3) {
      titleErrorSet("Title field is too short");
      isError = true;
    } else titleErrorSet("");

    if (question.length < 3) {
      questionErrorSet("Question field is too short");
      isError = true;
    } else questionErrorSet("");

    if (endVoteDate == "") {
      dateErrorSet("Date field is required");
      isError = true;
    } else dateErrorSet("");

    if (endVoteTime == "") {
      timeErrorSet("Time field is required");
      isError = true;
    } else timeErrorSet("");

    if (isError) {
      alert("Form is invalid!");
    } else {
      createNewApplication();
      alert("Application created: " + title);
      navigation.navigate("ApplicationsList");
    }
  };

  const validateTilte = () => {
    if (title == "") titleErrorSet("");
    else if (title.length < 3) {
      titleErrorSet("Title field is too short");
    } else titleErrorSet("");
  };

  const validateQuestion = () => {
    if (question == "") questionErrorSet("");
    else if (question.length < 3) {
      questionErrorSet("Question field is too short");
    } else questionErrorSet("");
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              placeholder="Title"
              style={styles.input}
              onChangeText={setTitle}
              value={title}
            />
            <Text style={styles.warning}>{titleError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Question *</Text>
            <TextInput
              placeholder="Question"
              style={styles.input}
              onChangeText={setQuestion}
              value={question}
            />
            <Text style={styles.warning}>{questionError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              placeholder="Description"
              multiline={true}
              style={styles.inputDesription}
              onChangeText={setDescription}
              value={description}
            />
            <Text></Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>End date *</Text>
            <Pressable onPress={() => setDatePickerFlag("show")}>
              <View style={styles.inputTime}>
                <Text>{endVoteDate ? endVoteDate : "_ _ _ _ - _ _ - _ _"}</Text>
                <Icon name="calendar-today" />
              </View>
            </Pressable>
            <Text style={styles.warning}>{dateError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>End time *</Text>
            <Pressable onPress={() => setTimePickerFlag("show")}>
              <View style={styles.inputTime}>
                <Text>{endVoteTime ? endVoteTime : "- - : - - : - -"}</Text>
                <Icon name="schedule" />
              </View>
            </Pressable>
            <Text style={styles.warning}>{timeError}</Text>
          </View>

          <Pressable
            onPress={() => submitForm()}
            style={styles.pressableApplication}
          >
            <Text>Add Application</Text>
          </Pressable>
          <Text>{datePickerFlag == "show" ? showDatePicker() : ""}</Text>
          <Text>{timePickerFlag == "show" ? showTimePicker() : ""}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  warning: {
    color: "red",
    fontWeight: "bold",
  },
  inputLabel: {
    marginBottom: 4,
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
  inputContainer: {
    width: "100%",
    marginTop: 16,
  },
  inputDesription: {
    width: "90%",
    borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  inputTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    width: "90%",
    borderWidth: 1,
    padding: 8,
  },
  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    padding: 10,
  },
  pressableApplication: {
    backgroundColor: "#2089DC",
    padding: 6,
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    paddingLeft: 16,
    paddingBottom: 27,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
