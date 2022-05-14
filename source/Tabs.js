import * as React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { HeaderComponent } from "../shared/HeaderComponent";
import { CalendarTab } from "./Tabs/CalendarTab";
import { FAQTab } from "./Tabs/FAQTab";
import { ApplicationsHomeScreen } from "./Tabs/ApplicationsTabs/ApplicationsHomeScreen";
import { ForumHomeScreen } from "./Tabs/ForumTabs/ForumHomeScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerRight: (
          <View style={styles.iconContainer}>
            <Icon type="ionicon" name="md-heart"></Icon>
          </View>
        ),
      }}
    >
      <Tab.Screen name="Applications" component={ApplicationsHomeScreen} />
      <Tab.Screen name="Forum" component={ForumHomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarTab} />
      <Tab.Screen name="FAQ" component={FAQTab} />
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
