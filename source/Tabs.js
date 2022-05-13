import * as React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import {HeaderComponent} from "../shared/HeaderComponent";

const styles = StyleSheet.create({
  header: {
    flex:1,
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

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent/>

        <Text>Hi from the Ho1meScreen.</Text>
      </SafeAreaView>
    );
  }
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <HeaderComponent/>
      <Text>Settings!</Text>
      <Text>Settings!</Text>
      <Text>Settings!</Text>
    </View>
  );
}

function TestScreen() {
  return (
    <View style={styles.container}>
      <HeaderComponent/>

      <Text>Testing!</Text>
    </View>
  );
}

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="TestScreen" component={TestScreen} />
    </Tab.Navigator>
  );
}
