import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native";
import { HeaderComponent } from "../../shared/HeaderComponent";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useSelector } from "react-redux";

export function UserOptionsScreen({ navigation }) {
  const isAdmin = useSelector((state) => state.userReducer.isAdmin);

  const changePassword = () => {
    navigation.navigate("Change Password Screen");
  };
  const registerUser = () => {
    navigation.navigate("Register User");
  };

  const contactAdministrator = () => {
    navigation.navigate("Contact Administrator");
  };

  return (
    <>
      <HeaderComponent title="User Options" />
      <View style={styles.container}>
        <Pressable
          onPress={() => changePassword()}
          style={styles.pressableApplication}
        >
          <Text>Change Password</Text>
        </Pressable>
        <Pressable
          onPress={() => contactAdministrator()}
          style={styles.pressableApplication}
        >
          <Text>Contact Administrator</Text>
        </Pressable>

        {isAdmin ? (
          <Pressable
            onPress={() => registerUser()}
            style={styles.pressableApplication}
          >
            <Text>Register User</Text>
          </Pressable>
        ) : (
          <></>
        )}
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
