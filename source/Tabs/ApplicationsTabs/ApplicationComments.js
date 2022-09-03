import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { HeaderComponent } from "../../../shared/HeaderComponent";
import { Icon } from "react-native-elements";
import { updateApplications } from "../../../shared/redux/actions";

import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function ApplicationComments({ navigation, route }) {
  const [application, setApplication] = useState({
    ...route.params.applicationObj,
  });
  const [comment, setComment] = useState("");
  const [commentsData, setComments] = useState([]);
  const [ref, setRef] = useState(null);

  const apiUrl = useSelector((state) => state.urlReducer.url);
  const userToken = useSelector((state) => state.userReducer.token);
  const createCommentUrl =
    apiUrl + "/api/ApplicationComment/createApplicationComment";
  const getCommentsUrl =
    apiUrl +
    "/api/ApplicationComment/getApplicationCommentForApplication/" +
    application.id;

  fetch(getCommentsUrl)
    .then((response) => response.json())
    .then((commentsResponse) => {
      setComments(commentsResponse);
    });

  let scrollToBottom = () => {
    ref.scrollTo({
      x: 0,
      y: 100000,
    });
  };

  let addComment = () => {
    if (comment) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
          Accept: "application/json",
        },

        body: JSON.stringify({
          applicationId: application.id,
          title: "notitle",
          commentText: comment,
        }),
      };
      fetch(createCommentUrl, requestOptions);
      setComment("");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.segmentTitle}>
          <Text style={styles.textBold}>{application.title}</Text>
        </View>
        <ScrollView
          ref={(ref) => {
            setRef(ref);
          }}
          onContentSizeChange={(width, height) => {
            scrollToBottom();
          }}
          style={styles.commentContainer}
        >
          {commentsData.map((element) => {
            return (
              <View key={element.id} style={styles.singleCommentView}>
                <Text style={styles.textBold}>
                  {element.user.firstName} {element.user.lastName[0]}.
                </Text>
                <Text>{element.commentText}</Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.segment}>
          <TextInput
            maxLength={160}
            onChangeText={setComment}
            value={comment}
            placeholder="Write comment..."
            style={styles.commentInput}
            multiline={true}
          />
          <Pressable onPress={addComment} style={styles.sendCommentBtn}>
            <Text>Send</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  singleCommentView: {
    padding: 4,
  },
  sendCommentBtn: {
    backgroundColor: "grey",
    height: "100%",
    maxHeight: 130,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderLeftWidth: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  commentInput: {
    maxWidth: 240,
    maxHeight: 130,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  segmentTitle: {
    width: "90%",
    padding: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  commentContainer: {
    width: "90%",
    height: "70%",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    borderWidth: 1,
  },
  segment: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    marginLeft: 5,
    borderWidth: 1,
    borderTopWidth: 0,
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
  inputContainer: {
    width: "100%",

    marginTop: 16,
  },
  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    padding: 10,
  },
  pressableApplication: {
    backgroundColor: "#2089DC",
    padding: 6,
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    paddingLeft: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
