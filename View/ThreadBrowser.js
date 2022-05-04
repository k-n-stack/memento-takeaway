import { View, Text, StyleSheet, Image } from "react-native"
import { useSelector } from "react-redux";

import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from "react";

const ThreadBrowser = () => {

  const thread = useSelector((state) => (state.navigation.selectedThread));
  const previousView = useSelector((state) => (state.navigation.previousView));

  const getBookmarks = (bookmarks) => {
    return bookmarks.map(function (bookmark) {
      return (
        <View style={styles.bookmarkContainer}>
          <Text numberOfLines={2} style={styles.bookmarkDescription}>{bookmark.description}</Text>
          <Text numberOfLines={1} style={styles.bookmarkUrl}>{bookmark.url}</Text>
          {
            bookmark.comments.length !== 0 &&
            <View style={styles.commentsContainer}>

              <View style={styles.backgroundContainer}>
                <LinearGradient
                  colors={['#ded5f3', '#d8e5f3']}
                  start={[1, 0]}
                  end={[0, 1]}
                  style={styles.background}          
                >
                </LinearGradient>
              </View>

              {getComments(bookmark.comments)}

            </View>
          }
        </View>
      )
    });
  }

  const getComments = (comments) => {
    return comments.map(function (comment) {
      return (
        <View style={comment.validated_at === null ? styles.commentContainerInvalid : styles.commentContainer}>
          <Text style={styles.commentPseudonym}>{comment.user.pseudonym}</Text>
          <Text>{comment.body}</Text>
        </View>
      )
    });
  }

  useEffect(()=>{console.log(thread)});

  return (
    <>
      <View style={previousView === "pinnedThread" ? styles.browserContainerExtra : styles.browserContainer}>
        {getBookmarks(Object.keys(thread).length !== 0 ? thread.bookmarks : [])}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  browserContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 50,
    paddingBottom: 50,
  },
  browserContainerExtra: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 50,
    paddingBottom: 140,
  },
  bookmarkContainer: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffffaa",
    marginBottom: 20,
  },
  bookmarkDescription: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookmarkUrl: {
    textDecorationLine: "underline",
    color: "blue",
    marginBottom: 15,
  },
  backgroundContainer: {
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    position: "absolute",
  },
  background: {
    flex: 1,
  },
  commentsContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  commentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 10,
    elevation: 1,
  },
  commentContainerInvalid: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ffad4f',
    marginBottom: 10,
    elevation: 1,
    opacity: 0.5,
  },  
  commentPseudonym: {
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 80,
    marginRight: 10,
  },
  threadOwner: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10,
    // position: "absolute",
  },
  ownerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});

export default ThreadBrowser;