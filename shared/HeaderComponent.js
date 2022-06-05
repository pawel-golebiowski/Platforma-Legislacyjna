import * as React from "react";
import { Header } from "react-native-elements";
import { Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "./redux/actions";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
});

export function HeaderComponent(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Header
        style={styles.header}
        centerComponent={{
          text: props.title ? props.title : "Enter custom title",
        }}
        rightComponent={{
          icon: "logout",
          color: "#fff",
          onPress: handleLogout,
        }}
      ></Header>
    </>
  );
}
