import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { EmptyPage } from "./source/EmptyPage";
import { LoginPage } from "./source/LoginPage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = React.useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogged ? (
          <Stack.Screen name="Home" component={LoginPage}></Stack.Screen>
        ) : (
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => (
              <LoginPage {...props} setIsLoggedFunction={setIsLogged} />
            )}
          </Stack.Screen>
        )}
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={EmptyPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
