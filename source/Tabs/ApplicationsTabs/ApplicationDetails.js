import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { HeaderComponent } from "../../../shared/HeaderComponent";
import { Icon } from "react-native-elements";

export function ApplicationDetails({ navigation, route }) {
  const { id } = route.params;
  const [agreeSelected, setSelected] = useState("123");

  let submitVote = () => {
    console.log("submit!");
    console.log("Your choice:", agreeSelected);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.segmentCenter}>
          <Text style={styles.textBold}>Tłumaczenie Lorem ipsum</Text>
        </View>
        <View style={styles.segment}>
          <Text>Description:</Text>
          <Text>
            Lorem ipsum – tekst składający się z łacińskich i quasi-łacińskich
            wyrazów, mający korzenie w klasycznej łacinie, wzorowany na
            fragmencie traktatu Cycerona „O granicach dobra i zła” napisanego w
            45 p.n.e.
          </Text>
        </View>
        <Pressable style={styles.pressableApplication}>
          <Text>Comments</Text>
        </Pressable>
        <View style={styles.segment}>
          <Text>End date of voting:</Text>
          <Text>13.09.2022</Text>
        </View>
        <View style={styles.segment}>
          <Text>Question:</Text>
          <Text>
            Czy utwór "Lorem ipsum" powinien być przetłumaczony na języki inne
            niż łaciński?
          </Text>
          <Pressable
            onPress={() => setSelected(true)}
            style={styles.voteOption}
          >
            {agreeSelected ? (
              <Icon name="radio-button-checked" />
            ) : (
              <Icon name="radio-button-unchecked" />
            )}
            <Text>Agree</Text>
          </Pressable>
          <Pressable
            onPress={() => setSelected(false)}
            style={styles.voteOption}
          >
            {agreeSelected ? (
              <Icon name="radio-button-unchecked" />
            ) : (
              <Icon name="radio-button-checked" />
            )}
            <Text>Disagree</Text>
          </Pressable>
        </View>
        <Pressable onPress={submitVote} style={styles.pressableApplication}>
          <Text>Submit</Text>
        </Pressable>
        <Text> Applications Details id: {route.params.id}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  voteOption: {
    flexDirection: "row",
    margin: 10,
  },
  btnAddApplication: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#FF4081",
    justifyContent: "center",
    alignItems: "center",
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pressableApplication: {
    backgroundColor: "#2089DC",
    padding: 6,
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  segmentCenter: {
    width: "90%",
    padding: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  segment: {
    width: "90%",
    padding: 10,
    margin: 5,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
