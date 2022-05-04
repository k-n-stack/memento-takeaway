import { View, Text, StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

import { RedirectionsIcon } from "../Component/Svg";

import { useDispatch } from "react-redux";

import { setPreviousView, setSelectedThread, setView } from "../Store/Features/navigationSlice";

const PinnedThreads = (props) => {

  const dispatch = useDispatch();

  const getThreads = (threads) => {
    return threads.map(function (thread, index) {
      return (
        <View style={styles.threadContainer} key={`pinned-thread-${index}`}>

          <View style={styles.backgroundContainer}>
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF00', '#FFFFFF00', '#'+thread.color+'33']}
              start={[1, 0]}
              end={[0, 1]}
              style={styles.background}          
            >
            </LinearGradient>
          </View>
          <View style={styles.backgroundContainer}>
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF00', '#FFFFFF00', '#FFFFFF00', '#'+thread.color+'33']}
              start={[0, 1]}
              end={[1, 0]}
              style={styles.background}          
            >
            </LinearGradient>
          </View>

          <View style={styles.threadContent} >

            <View style={styles.threadTitleContainer}>
              <View style={styles.threadTitleImage}>
                <Image
                  style={styles.avatar}
                  source={{ uri : `https://api.stack.mn/api/${thread.user.image_url}` }}
                />
                <Text 
                  style={styles.threadTitle}
                  numberOfLines={1}
                >
                  {thread.title}
                </Text>

              </View>
              <TouchableWithoutFeedback onPress={() => {
                dispatch(setPreviousView("pinnedThread"));
                dispatch(setSelectedThread(thread));
                dispatch(setView("threadBrowser"));
              }}>
                <View style={styles.threadTitleIcon}>
                  <RedirectionsIcon color={"rgba(0, 0, 0, 0.4)"} />
                </View>
              </TouchableWithoutFeedback>

            </View>
            {getBookmarks(thread.bookmarks)}
          </View>

        </View>
      );
    });
  }

  const getBookmarks = (bookmarks) => {
    return bookmarks.map(function (bookmark, index) {
      return (
        <View style={styles.bookmarkContainer} key={`pinned-thread-bookmark-${index}`}>
          <Text numberOfLines={1} style={styles.bookmarkDescription}>{bookmark.description}</Text>
          <Text numberOfLines={1} style={styles.bookmarkUrl}>{bookmark.url}</Text>
        </View>
      )
    })
  }

  return (
    <View style={styles.myThreadsContainer}>
      {getThreads(props.threads)}
    </View>
  )
}

const styles = StyleSheet.create({
  myThreadsContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 50,
    paddingBottom: 50,
  },
  threadContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF99",
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    // elevation: 1,
  },
  threadContent: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  threadTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    overflow: "hidden",
  },
  threadTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: 230,
    flexGrow: 0,
  },
  threadTitleIcon: {
    width: 30,
    height: 30,
  },
  threadTitleImage: {
    flexDirection: "row",
    alignItems: "center",
  },  
  bookmarkContainer: {
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bookmarkUrl: {
    color: "blue",
    textDecorationLine: "underline",
  },
  bookmarkDescription: {
    fontSize: 16,
    fontWeight: "bold",
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
  avatar:{
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 10,
  }
});

export default PinnedThreads;