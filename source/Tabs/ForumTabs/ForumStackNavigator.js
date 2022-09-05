import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForumHomeScreen } from "./ForumHomeScreen";
import { ThreadDetailsScreen } from "./ThreadDetailsScreen";
import { AddThread } from "./AddThread";

const Stack = createNativeStackNavigator();

export function ForumStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Forum Home Screen"
        component={ForumHomeScreen}
      />
      <Stack.Screen
        name="Thread Details Screen"
        component={ThreadDetailsScreen}
      />
      <Stack.Screen name="Add Thread" component={AddThread} />
    </Stack.Navigator>
  );
}

AddThread;
