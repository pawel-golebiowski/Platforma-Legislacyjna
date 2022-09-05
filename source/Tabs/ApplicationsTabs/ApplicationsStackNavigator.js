import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationDetails } from "./ApplicationDetails";
import { ApplicationsHomeScreen } from "./ApplicationsHomeScreen";
import { AddApplication } from "./AddApplication";
import { ApplicationComments } from "./ApplicationComments";

const Stack = createNativeStackNavigator();

export function ApplicationsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ApplicationsList"
        component={ApplicationsHomeScreen}
      />
      <Stack.Screen name="Application Details" component={ApplicationDetails} />
      <Stack.Screen name="Add Application" component={AddApplication} />
      <Stack.Screen
        name="Application Comments"
        component={ApplicationComments}
      />
    </Stack.Navigator>
  );
}
