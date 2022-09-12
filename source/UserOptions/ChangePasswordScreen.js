import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useSelector } from "react-redux";

export function ChangePasswordScreen() {
  const userToken = useSelector((state) => state.userReducer.token);

  const apiUrl = useSelector((state) => state.urlReducer.url);
  const changePasswordUrl = apiUrl + "/api/Authentication/changePassword";

  const [password, passwordSet] = useState("");
  const [passwordNew, passwordNewSet] = useState("");
  const [passwordNewConfirm, passwordNewConfirmSet] = useState("");

  const [passwordError, passwordErrorSet] = useState("");
  const [passwordNewError, passwordNewErrorSet] = useState("");
  const [passwordNewConfirmError, passwordNewConfirmErrorSet] = useState("");

  const submitForm = () => {
    if (passwordNew === passwordNewConfirm) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
          Accept: "application/json",
        },

        body: JSON.stringify({
          oldPassword: password,
          newPassword: passwordNew,
          newPasswordConfirmation: passwordNewConfirm,
        }),
      };

      fetch(changePasswordUrl, requestOptions);
      alert("Password changed!");
      passwordSet("");
      passwordNewSet("");
      passwordNewConfirmSet("");
    } else passwordNewConfirmErrorSet("Passwords are diffrent!");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Old Password *</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Old password"
            style={styles.input}
            onChangeText={passwordSet}
            value={password}
          />
          <Text style={styles.warning}>{passwordError}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Password *</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="New Password"
            style={styles.input}
            onChangeText={passwordNewSet}
            value={passwordNew}
          />
          <Text style={styles.warning}>{passwordNewError}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm New Password *</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Confirm Password"
            style={styles.input}
            onChangeText={passwordNewConfirmSet}
            value={passwordNewConfirm}
          />
          <Text style={styles.warning}>{passwordNewConfirmError}</Text>
        </View>

        <Pressable
          onPress={() => submitForm()}
          style={styles.pressableApplication}
        >
          <Text>Change Password </Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  warning: {
    color: "red",
    fontWeight: "bold",
  },

  input: {
    height: 40,
    width: 350,
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
