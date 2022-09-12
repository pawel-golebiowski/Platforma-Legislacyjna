import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { CalendarTab } from "./Tabs/CalendarTab";
import { FAQTab } from "./Tabs/FAQ/FAQTab";
import { ApplicationsStackNavigator } from "./Tabs/ApplicationsTabs/ApplicationsStackNavigator";
import { ForumStackNavigator } from "./Tabs/ForumTabs/ForumStackNavigator";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Applications",
          tabBarIcon: () => <Icon name="list" />,
        }}
        name="Applications"
        component={ApplicationsStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Forum",
          tabBarIcon: () => <Icon name="forum" />,
        }}
        name="Forum"
        component={ForumStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: () => <Icon name="event" />,
        }}
        name="Calendar"
        component={CalendarTab}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "FAQ",
          tabBarIcon: () => <Icon name="help" />,
        }}
        name="FAQ"
        component={FAQTab}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
  },
});
