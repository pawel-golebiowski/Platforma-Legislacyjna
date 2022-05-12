import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { EmptyPage } from "./source/EmptyPage";
import { LoginPage } from "./source/LoginPage";
import Tabs from "./source/Tabs";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = React.useState(false);
  return (
    <NavigationContainer>
      {isLogged ? (
        <Tabs />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => (
              <LoginPage {...props} setIsLoggedFunction={setIsLogged} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={EmptyPage}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
