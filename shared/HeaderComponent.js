import * as React from "react";
import { Header } from "react-native-elements";
import { Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { hideUserOptions, logout, showUserOptions } from "./redux/actions";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
});

export function HeaderComponent(props) {
  const dispatch = useDispatch();

  const isShown = useSelector(
    (state) => state.userOptionsReducer.userOptionsShow
  );

  const handleShowUserOptions = () => {
    isShown ? dispatch(hideUserOptions()) : dispatch(showUserOptions());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Header
        style={styles.header}
        leftComponent={{
          icon: isShown ? "menu" : "settings",
          color: "#fff",
          onPress: handleShowUserOptions,
        }}
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
