import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {
  setUser,
  updateApplications,
  updateFAQs,
} from "../shared/redux/actions";
import { useDispatch, useSelector } from "react-redux";

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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let contactAdministrator = () => {
    console.log("Contact administrator form button!");
    navigation.navigate("Contact Administrator");
  };

  return (
    <View style={styles.container}>
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
      <Pressable onPress={contactAdministrator} style={styles.pressable}>
        <Text>Contact administrator</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
