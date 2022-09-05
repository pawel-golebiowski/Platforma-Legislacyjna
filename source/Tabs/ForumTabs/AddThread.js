import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateThreads } from "../../../shared/redux/actions";

export function AddThread({ navigation }) {
  const apiUrl = useSelector((state) => state.urlReducer.url);
  const createThreadUrl = apiUrl + "/api/ForumThread/createThread";
  const getThreadsUrl = apiUrl + "/api/ForumThread/getThreads";

  const userToken = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();

  const [title, titleSet] = useState("");
  const [body, bodySet] = useState("");

  const [titleError, titleErrorSet] = useState("");
  const [bodyError, bodyErrorSet] = useState("");

  const createNewThread = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
        Accept: "application/json",
      },

      body: JSON.stringify({
        title: title,
        body: body,
      }),
    };

    fetch(createThreadUrl, requestOptions).then(() => {
      fetch(getThreadsUrl)
        .then((response) => response.json())
        .then((threadData) => {
          dispatch(updateThreads(threadData));
        });
    });
  };

  const validateTitle = () => {
    if (title == "") titleErrorSet("");
    else if (title.length < 3) {
      titleErrorSet("Title field is too short");
    } else titleErrorSet("");
  };

  const validateBody = () => {
    if (body == "") bodyErrorSet("");
    else if (body.length < 10) {
      bodyErrorSet("Post Content is too short");
    } else bodyErrorSet("");
  };

  useEffect(() => {
    validateTitle();
  }, [title]);

  useEffect(() => {
    validateBody();
  }, [body]);

  let submitForm = () => {
    let isError = false;
    if (title.length < 3) {
      isError = true;
      titleErrorSet("Title field is too short");
    } else titleErrorSet("");

    if (body.length < 10) {
      isError = true;
      bodyErrorSet("Post Content is too short");
    } else bodyErrorSet("");

    if (isError) {
      alert("Form is invalid!");
    } else {
      createNewThread();
      alert("Thread created: " + title);
      titleSet("");
      bodySet("");
      navigation.navigate("Forum Home Screen");
    }
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
              onChangeText={titleSet}
              value={title}
            />
            <Text style={styles.warning}>{titleError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Post content *</Text>
            <TextInput
              placeholder="Post content..."
              multiline={true}
              style={styles.inputDesription}
              onChangeText={bodySet}
              value={body}
            />
            <Text style={styles.warning}>{bodyError}</Text>
          </View>

          <Pressable
            onPress={() => submitForm()}
            style={styles.pressableApplication}
          >
            <Text>Add Application</Text>
          </Pressable>
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
    height: 550,
    backgroundColor: "#fff",
    padding: 5,
    paddingLeft: 16,
    paddingBottom: 27,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
