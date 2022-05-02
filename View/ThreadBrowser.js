import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux";

import { LinearGradient } from 'expo-linear-gradient';

const ThreadBrowser = () => {

  const thread = useSelector((state) => (state.navigation.selectedThread));

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
        <View style={styles.commentContainer}>
          <Text style={styles.commentPseudonym}>{comment.user.pseudonym}</Text>
          <Text>{comment.body}</Text>
        </View>
      )
    });
  }

  return (
    <View style={styles.browserContainer}>
      {getBookmarks(Object.keys(thread).length !== 0 ? thread.bookmarks : [])}
    </View>
  );
};

const styles = StyleSheet.create({
  browserContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 50,
    paddingBottom: 50,
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
  commentPseudonym: {
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ThreadBrowser;