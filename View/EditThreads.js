import { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { TrashIcon } from "../Component/Svg";
import { ThumbUpIcon } from "../Component/Svg";

import { useDispatch, useSelector } from "react-redux";
import { validateComments, deleteComments } from "../Store/Features/navigationSlice";

const EditThreads = () => {

  const dispatch = useDispatch();

  const invalidComments = useSelector((state) => (state.user.invalidComments));

  useEffect(() => {
    // console.log(invalidComments.map(function (comment) {return comment.id}));
  });

  const getComments = (comments) => {
    return comments.map(function (comment, index) {
      // console.log(comment.user.image_url);
      return (
        <View style={styles.commentContainer} key={`comment-${index}`}>
          <View style={styles.commentPoster}>
            <Image 
              style={styles.avatar}
              source={{ uri : `https://api.stack.mn/api/${comment.user.image_url}` }}
            />
            <View style={styles.userInfos}>
              <Text style={styles.pseudonym}>{comment.user.pseudonym}</Text>
              <Text style={styles.date}>{comment.created_at}</Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <Text>{comment.body}</Text>
          </View>

          
          <Text style={styles.threadsHeader}>Threads :</Text>
          <Text style={styles.threadsList} numberOfLines={1}>
            {comment.bookmark.threads.map(function (thread) {
              return thread.title;
            }).join(" - ")}
          </Text>

          <Text numberOfLines={1} style={styles.bookmarkHeader}>Bookmark :</Text>
          <Text numberOfLines={1} style={styles.bookmarkDescription}>{comment.bookmark.description}</Text>
          <Text numberOfLines={1} style={styles.bookmarkUrl}>{comment.bookmark.url}</Text>

          <View style={styles.buttonContainer}>

            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(deleteComments({
                  comments: [comment.id],
                }));
              }}
            >
              <View style={{
                ...styles.button,
                backgroundColor: "#a52121",
              }}>
                <View style={styles.buttonIconContainer}>
                  <TrashIcon color="#FFFFFF" />
                </View>
                <Text style={styles.buttonText}>Reject</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(validateComments({
                  comments: [comment.id],
                }))
              }}
            >
              <View style={{
                ...styles.button,
                backgroundColor: "#99D17E",
              }}>
                <View style={styles.buttonIconContainer}>
                  <ThumbUpIcon color="#FFFFFF" />
                </View>
                <Text style={styles.buttonText}>Validate</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>
        </View>
      );
    });
  }

  return (
    <View style={styles.editContainer}>
      {getComments(invalidComments)}
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 50,
    paddingBottom: 50,
  },
  commentContainer: {
    backgroundColor: '#ffffffaa',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 10,
  },
  commentPoster: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "blue",
    marginBottom: 10,
  }, 
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 10,
  },
  pseudonym: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00000066",
  },
  date: {
    fontWeight: "bold",
    color: "#00000088",
  },
  bodyContainer: {
    // backgroundColor: "#FFFFFF77",
    backgroundColor: "#ffad4f",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  threadsHeader: {
    fontWeight: "bold",
    color: "#00000044"
  }, 
  threadsList: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00000077",
  },
  bookmarkHeader: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#00000044"
  },
  bookmarkDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00000077",
  },
  bookmarkUrl: {
    fontSize: 12,
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    width: 65,
    height: 65,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  buttonIconContainer: {
    width: 30,
    height: 30,
  },
})

export default EditThreads;