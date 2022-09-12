import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Tab } from "react-native-elements";
import Tabs from "./source/Tabs";
import { useSelector } from "react-redux";
import { LoginPage } from "./source/LoginPage";
import { UserOptionsStackNavigator } from "./source/UserOptions/UserStackNavigator";

export const AppBoot = () => {
  const userId = useSelector((state) => state.userReducer.userId);
  const showUserOptions = useSelector(
    (state) => state.userOptionsReducer.userOptionsShow
  );

  return (
    <>
      <NavigationContainer>
        {userId ? (
          showUserOptions ? (
            <UserOptionsStackNavigator />
          ) : (
            <Tabs />
          )
        ) : (
          <LoginPage />
        )}
      </NavigationContainer>
    </>
  );
};
