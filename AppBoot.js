import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Tab } from "react-native-elements";
import Tabs from "./source/Tabs";
import { useSelector } from "react-redux";
import { LoginPage } from "./source/LoginPage";
import { EmptyPage } from "./source/EmptyPage";

export const AppBoot = () => {
  const Stack = createNativeStackNavigator();
  const isLogged = useSelector((state) => state.userReducer.isLogged);

  return (
    <>
      <NavigationContainer>
        {isLogged ? (
          <Tabs />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={LoginPage}></Stack.Screen>
            <Stack.Screen name="Profile" component={EmptyPage}></Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};
