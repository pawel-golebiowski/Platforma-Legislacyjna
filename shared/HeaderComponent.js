import * as React from "react";
import { Header } from "react-native-elements";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
});

export class HeaderComponent extends React.Component {
  handleLogout() {
    console.log("logout");
  }

  render() {
    return (
      <>
        <Header
          style={styles.header}
          //   leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "My Title" }}
          rightComponent={{
            icon: "logout",
            color: "#fff",
            onPress: this.handleLogout,
          }}
        ></Header>
      </>
    );
  }
}
