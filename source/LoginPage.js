import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export function LoginPage(props) {
  let tryToLogin = () => {
    props.setIsLoggedFunction(true);
  };

  let contactAdministrator = () => {
    console.log("click2");
  };
  const [login, onChangeLogin] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [userId, setUserId] = React.useState();

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="username"
        style={styles.input}
        onChangeText={onChangeLogin}
        value={login}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="password"
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
      />
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
});