import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

import { HeaderComponent } from "../../../shared/HeaderComponent";
import { useSelector } from "react-redux";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export function ForumHomeScreen({ navigation }) {
  const apiUrl = useSelector((state) => state.urlReducer.url);
  let threads = [];
  threads = useSelector((state) => state.forumReducer.threads);

  const openThread = (thread) => {
    navigation.navigate("Thread Details Screen", {
      threadObj: thread,
    });
  };

  const addThread = () => {
    navigation.navigate("Add Thread");
  };

  const addLastCommentDateToThreads = (threads) => {
    threads.map((thread) => {
      if (thread.forumComments.length > 0) {
        thread.lastCommentDate =
          thread.forumComments[thread.forumComments.length - 1].createDateTime;
      } else {
        thread.lastCommentDate = thread.createDateTime;
      }
    });
  };

  const compareLastCommentDates = (a, b) => {
    if (a.lastCommentDate > b.lastCommentDate) return -1;
    if (a.lastCommentDate === b.lastCommentDate) return 0;
    if (a.lastCommentDate < b.lastCommentDate) return 1;
  };

  let renderThreads = () => {
    let recordThreads = [];
    if (threads) {
      addLastCommentDateToThreads(threads);
      threads.sort(compareLastCommentDates);
      threads.map((record) => {
        return recordThreads.push(
          <>
            <Pressable
              key={record.id}
              onPress={() => {
                openThread(record);
              }}
              style={styles.pressableThread}
            >
              <Text style={styles.threadTitle}>{record.title}</Text>
              <View style={styles.threadAdditionalInfo}>
                <Text>created: {record.createDateTime.slice(0, 10)}</Text>
                <View style={styles.inRow}>
                  <Icon name="chat" />

                  <Text> {record.forumComments.length + 1}</Text>
                </View>
              </View>
              <Text>Last comment: {record.lastCommentDate.slice(0, 10)}</Text>
            </Pressable>
          </>
        );
      });
    }
    return recordThreads;
  };

  return (
    <>
      <HeaderComponent title="Forum" />
      <ScrollView>
        <View style={styles.container}>
          <Text></Text>
          <View style={styles.threadListHeader}>
            <Text>Thread list:</Text>
            <Pressable onPress={addThread} style={styles.addNewThreadBtn}>
              <Text>+ Add new thread</Text>
            </Pressable>
          </View>
          {renderThreads()}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  addNewThreadBtn: {
    borderRadius: 3,
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2089DC",
  },
  threadListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    width: "90%",
  },
  threadAdditionalInfo: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inRow: {
    flexDirection: "row",
  },
  threadTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pressableThread: {
    backgroundColor: "#2089DC",
    padding: 16,

    width: "90%",
    margin: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
