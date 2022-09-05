import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Tab } from "react-native-elements";
import Tabs from "./source/Tabs";
import { useSelector } from "react-redux";
import { LoginPage } from "./source/LoginPage";
import { RegisterPage } from "./source/RegisterPage";

export const AppBoot = () => {
  const Stack = createNativeStackNavigator();
  const userId = useSelector((state) => state.userReducer.userId);

  return (
    <>
      <NavigationContainer>
        {userId ? (
          <Tabs />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginPage}
            ></Stack.Screen>
            <Stack.Screen
              name="Contact Administrator"
              component={RegisterPage}
            ></Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};
