import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export function RegisterPage() {
  const [email, emailSet] = useState("");
  const [password, passwordSet] = useState("");
  const [passwordConfirm, passwordConfirmSet] = useState("");
  const [firstName, firstNameSet] = useState("");
  const [lastName, lastNameSet] = useState("");
  const [additionalInfo, additionalInfoSet] = useState("");

  const [emailError, emailErrorSet] = useState("");
  const [passwordError, passwordErrorSet] = useState("");
  const [passwordConfirmError, passwordConfirmErrorSet] = useState("");
  const [firstNameError, firstNameErrorSet] = useState("");
  const [lastNameError, lastNameErrorSet] = useState("");

  let submitForm = () => {
    let isError = false;
    if (email.length < 5) {
      emailErrorSet("Email too short");
      isError = true;
    } else emailErrorSet("");

    if (password.length < 8) {
      passwordErrorSet("Password too short");
      isError = true;
    } else passwordErrorSet("");

    if (password != passwordConfirm) {
      passwordConfirmErrorSet("Passwords are different");
      isError = true;
    } else passwordConfirmErrorSet("");

    if (firstName.length < 3) {
      firstNameErrorSet("Email too short");
      isError = true;
    } else firstNameErrorSet("");

    if (lastName.length < 3) {
      lastNameErrorSet("Email too short");
      isError = true;
    } else lastNameErrorSet("");

    if (isError) {
      alert("Form invalid");
    } else {
      console.log("form send!");
    }
  };

  let validateEmail = (emailString) => {
    // check for @ sign
    var atSymbol = emailString.indexOf("@");
    if (atSymbol < 1) return false;

    var dot = emailString.indexOf(".");
    if (dot <= atSymbol + 2) return false;

    // check that the dot is not at the end
    if (dot === emailString.length - 1) return false;

    return true;
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={emailSet}
              value={email}
            />
            <Text style={styles.warning}>{emailError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password *</Text>
            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={passwordSet}
              value={password}
            />
            <Text style={styles.warning}>{passwordError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password *</Text>
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              onChangeText={passwordConfirmSet}
              value={passwordConfirm}
            />
            <Text style={styles.warning}>{passwordConfirmError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name *</Text>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              onChangeText={firstNameSet}
              value={firstName}
            />
            <Text style={styles.warning}>{firstNameError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name *</Text>
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              onChangeText={lastNameSet}
              value={lastName}
            />
            <Text style={styles.warning}>{lastNameError}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Additional Information</Text>
            <TextInput
              placeholder="Additional Information..."
              multiline={true}
              style={styles.inputDesription}
              onChangeText={additionalInfoSet}
              value={additionalInfo}
            />
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
    maxHeight: 120,
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
