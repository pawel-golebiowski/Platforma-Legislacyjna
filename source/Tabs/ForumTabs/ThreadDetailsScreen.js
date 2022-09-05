import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { HeaderComponent } from "../../../shared/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { updateThreads } from "../../../shared/redux/actions";

export function ThreadDetailsScreen({ navigation, route }) {
  const [showAppPostDialog, showAppPostDialogSet] = useState(false);
  const [postContent, postContentSet] = useState("");
  const [threadComments, threadCommentsSet] = useState([]);
  const userToken = useSelector((state) => state.userReducer.token);

  const thread = { ...route.params.threadObj };
  const apiUrl = useSelector((state) => state.urlReducer.url);
  const getThreadCommentsUrl =
    apiUrl + "/api/ForumComment/getCommentsForThread/" + thread.id;
  const getThreadsUrl = apiUrl + "/api/ForumThread/getThreads";
  const postThreadCommentUrl = apiUrl + "/api/ForumComment/createForumComment";

  const dispatch = useDispatch();

  const getThreadComments = () => {
    fetch(getThreadCommentsUrl)
      .then((response) => response.json())
      .then((comments) => {
        threadCommentsSet(comments);
      });
  };
  getThreadComments();

  const togglePostDialog = () => {
    if (showAppPostDialog) {
      if (postContent.length > 1) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken,
            Accept: "application/json",
          },

          body: JSON.stringify({
            threadId: thread.id,
            commentText: postContent,
          }),
        };

        fetch(postThreadCommentUrl, requestOptions).then(() => {
          postContentSet("");
          showAppPostDialogSet(false);
          alert("Post added!");
          fetch(getThreadsUrl)
            .then((response) => response.json())
            .then((threadData) => {
              dispatch(updateThreads(threadData));
            });
          getThreadComments();
        });
      }
    } else showAppPostDialogSet(true);
  };

  const closePostDialog = () => {
    showAppPostDialogSet(false);
  };

  const renderSingleComment = (recordComments, record) => {
    return recordComments.push(
      <>
        <View style={styles.segment}>
          <View style={styles.userInfo}>
            <Text>
              {record.user.firstName} {record.user.lastName}{" "}
            </Text>
            <Text>
              {record.createDateTime.slice(11).slice(0, 5)}{" "}
              {record.createDateTime.split("T")[0]}
            </Text>
          </View>
          <View style={styles.userComment}>
            <Text>{record.commentText}</Text>
          </View>
        </View>
      </>
    );
  };

  const renderComments = () => {
    let recordComments = [];
    if (threadComments) {
      const firstCommentObject = {
        commentText: thread.body,
        createDateTime: thread.createDateTime,
        user: {
          firstName: thread.user.firstName,
          lastName: thread.user.lastName,
        },
      };

      renderSingleComment(recordComments, firstCommentObject);
      threadComments.map((record) =>
        renderSingleComment(recordComments, record)
      );
    }

    return recordComments;
  };

  const renderAddCommentDialog = () => {
    if (showAppPostDialog)
      return (
        <>
          <Pressable onPress={closePostDialog} style={styles.closePostDialog}>
            <Icon name="close"></Icon>
          </Pressable>
          <Text style={styles.addPostLabel}>Post Content:</Text>

          <View style={styles.segmentInput}>
            <TextInput
              maxLength={640}
              placeholder="Post content..."
              value={postContent}
              onChangeText={postContentSet}
              style={styles.commentInput}
              multiline={true}
            />
          </View>
        </>
      );
  };

  return (
    <>
      <View style={styles.container}>
        {renderAddCommentDialog()}
        <Pressable
          onPress={togglePostDialog}
          style={styles.pressableApplication}
        >
          <Text>{showAppPostDialog ? "Add Post" : "Answer"}</Text>
        </Pressable>
        <ScrollView style={styles.postList}>{renderComments()}</ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  addPostLabel: {
    marginLeft: 21,
    alignSelf: "flex-start",
  },
  commentInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userInfo: {
    justifyContent: "space-between",
    backgroundColor: "#cccccc",
    flexDirection: "row",
    borderBottomWidth: 1,
    padding: 10,
  },
  userComment: {
    maxWidth: 400,
    padding: 10,
  },
  segment: {
    width: "90%",
    margin: 5,
    marginVertical: 10,
    borderWidth: 1,
  },
  segmentInput: {
    width: "90%",
    borderWidth: 1,
  },
  postList: {
    width: "90%",
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
  closePostDialog: {
    marginTop: 8,
    padding: 6,
    width: "90%",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  pressableThread: {
    backgroundColor: "#2089DC",
    padding: 16,

    width: "90%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
