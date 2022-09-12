import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, LogBox } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {
  setUser,
  updateApplications,
  updateFAQs,
  updateThreads,
} from "../shared/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "react-native-elements";

export function LoginPage({ navigation }) {
  const userId = useSelector((state) => state.userReducer.userId);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [suggetsionMsg, setSuggetsionMsg] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const apiUrl = useSelector((state) => state.urlReducer.url);
  const loginUrl = apiUrl + "/api/Authentication/login";
  const getApplicationsUrl = apiUrl + "/api/Application/getApplications";
  const getFAQUrl = apiUrl + "/api/FAQ/getFAQs";
  const getThreadsUrl = apiUrl + "/api/ForumThread/getThreads";

  LogBox.ignoreAllLogs();
  const setApplications = () => {
    fetch(getApplicationsUrl)
      .then((response) => response.json())
      .then((applicationData) => {
        dispatch(updateApplications(applicationData));
      });
  };

  const setFAQ = () => {
    fetch(getFAQUrl)
      .then((response) => response.json())
      .then((FAQ) => {
        dispatch(updateFAQs(FAQ));
      });
  };

  const setThreads = () => {
    fetch(getThreadsUrl)
      .then((response) => response.json())
      .then((threads) => {
        dispatch(updateThreads(threads));
      });
  };

  let tryToLogin = () => {
    console.log("tryToLogin method id: " + Math.floor(Math.random() * 1000000));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch(loginUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status) {
          setErrorMsg("Incorrect email or password");
          setSuggetsionMsg("Enter correct data or contact administrator");
        } else {
          setErrorMsg("");
          setSuggetsionMsg("");
          dispatch(setUser(responseData));
          setApplications();
          setFAQ();
          setThreads();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let contactAdministrator = () => {
    navigation.navigate("Contact Administrator");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleLogo}>Legislation Project</Text>
      <Text>Email</Text>
      <TextInput
        placeholder="username"
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="password"
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
      />
      <Text style={styles.warning}>{errorMsg}</Text>
      <Text style={styles.warning}>{suggetsionMsg}</Text>
      <Pressable onPress={tryToLogin} style={styles.pressable}>
        <Text>Login</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  titleLogo: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  pressable: {
    backgroundColor: "rgb(175,233,233)",
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  input: {
    height: 40,
    width: 240,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  warning: {
    color: "red",
    fontWeight: "bold",
  },
});
