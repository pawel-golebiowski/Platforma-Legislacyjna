import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Tab } from "react-native-elements";
import Tabs from "./source/Tabs";

const Stack = createNativeStackNavigator();
// const [isLogged, setIsLogged] = React.useState(false);

export class AppBoot extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </>
    );
  }
}
