import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationDetails } from "./ApplicationDetails";
import { ApplicationsHomeScreen } from "./ApplicationsHomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { AddApplication } from "./AddApplication";

const Stack = createNativeStackNavigator();

export function ApplicationsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ApplicationsList"
        component={ApplicationsHomeScreen}
      />
      <Stack.Screen name="ApplicationDetails" component={ApplicationDetails} />
      <Stack.Screen name="AddApplication" component={AddApplication} />
    </Stack.Navigator>
  );
}
