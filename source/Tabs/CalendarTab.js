import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { HeaderComponent } from "../../shared/HeaderComponent";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function CalendarTab() {
  const apiUrl = useSelector((state) => state.urlReducer.url);
  const applications = useSelector(
    (state) => state.applicationReducer.applications
  );
  let applicationsToDiplay = [];
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [displayApplications, setDisplayApplications] = useState([]);

  let selectDate = (dateObject) => {
    let newDate = {};
    setSelectedDate(dateObject.dateString);
    newDate[dateObject.dateString] = { selected: true };

    let markedDatesCopy = JSON.parse(JSON.stringify(markedDates));
    for (const [key, value] of Object.entries(markedDatesCopy)) {
      if (key == dateObject.dateString) {
        if (value.marked) {
          newDate[dateObject.dateString] = { marked: true, selected: true };
        }
      }
      value.selected = false;
    }

    setDisplayApplications(
      applications.filter((element) => {
        const endVoteDate = element.endVoteDateTime.substring(0, 10);
        return endVoteDate === dateObject.dateString;
      })
    );
    setMarkedDates({ ...markedDatesCopy, ...newDate });
  };

  useEffect(() => {
    let dateConfig = {};
    applications.map((element) => {
      let endVoteDate = element.endVoteDateTime.substring(0, 10);
      dateConfig[endVoteDate] = { marked: true };
      let configClone = JSON.parse(JSON.stringify(dateConfig));
      setMarkedDates({ ...markedDates, ...configClone });
    });
  }, [applications]);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <HeaderComponent title="Calendar" />
          <Calendar
            style={styles.calendarStyle}
            onDayPress={(day) => {
              selectDate(day);
            }}
            markedDates={markedDates}
          ></Calendar>
          <View style={styles.table}>
            <Text> Incoming end of voutings: </Text>
            <Text>{selectedDate}</Text>
          </View>
          {displayApplications.length ? (
            displayApplications.map((application) => (
              <View key={application.id} style={styles.tableCell}>
                <Text> {application.title}</Text>
                <Text>
                  {" "}
                  {new Date(application.endVoteDateTime).toLocaleTimeString()}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.tableCell}>
              <Text> Please select other date to see details</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  table: {
    marginTop: 16,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#cccccc",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  tableCell: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    padding: 10,
    borderWidth: 1,
  },
  calendarStyle: {
    width: "100%",
  },
  container: {
    marginBottom: 8,
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
