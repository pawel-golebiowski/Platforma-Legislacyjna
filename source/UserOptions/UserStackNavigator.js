import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChangePasswordScreen } from "./ChangePasswordScreen";
import { ContactAdministrator } from "./ContactAdministrator";
import { RegisterUser } from "./RegisterUser";
import { UserOptionsScreen } from "./UserOptionsScreen";

const Stack = createNativeStackNavigator();

export function UserOptionsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="User Options"
        component={UserOptionsScreen}
      />
      <Stack.Screen
        name="Change Password Screen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="Contact Administrator"
        component={ContactAdministrator}
      />
      <Stack.Screen name="Register User" component={RegisterUser} />
    </Stack.Navigator>
  );
}
