import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Animated, Button } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { TrashIcon } from "../Component/Svg";
import { ThumbUpIcon } from "../Component/Svg";

import { useDispatch, useSelector } from "react-redux";
import { validateComments, deleteComments } from "../Store/Features/navigationSlice";
import { setInvalidComments } from "../Store/Features/userSlice";
import { setDeletedComment } from "../Store/Features/userSlice";
import { setValidatedComment } from "../Store/Features/userSlice";
import { updateInvalidComments } from "../Store/Features/userSlice";

const Comment = (props) => {

  const comment = props.comment;  
  
  const dispatch = useDispatch();
  
  const deletedComment = useSelector((state) => (state.user.deletedComment));
  const validatedComment = useSelector((state) => (state.user.validatedComment));

  const heightAnim = useRef(new Animated.Value(500)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const marginAnim = useRef(new Animated.Value(20)).current;
  
  useEffect(() => {
    // console.log(validatedComment);
    if (comment.id === deletedComment || comment.id === validatedComment) {
      console.log('here------')
      Animated.sequence([
        Animated.parallel([
          Animated.timing(heightAnim, {
            toValue: 80,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(colorAnim, {
            toValue: 0.9,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(800),
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(marginAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(({ finished }) => {
        if (comment.id === deletedComment) {
          // dispatch(updateInvalidComments(deletedComment));
          dispatch(setDeletedComment(0));
        }
        if (comment.id === validatedComment) {
          // dispatch(updateInvalidComments(validatedComment));
          dispatch(setValidatedComment(0));
        }
      });
    }
  });

  return (
    <View>

      <Animated.View 
        style={{
          ...styles.commentContainer,
          height: (comment.id === deletedComment || comment.id === validatedComment) ? heightAnim : 500,
          marginBottom: (comment.id === deletedComment || comment.id === validatedComment) ? marginAnim : 20,
        }} 
      >


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
          <Text numberOfLines={9}>{comment.body}</Text>
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

        <Animated.View
          style={{
            ...styles.deleteLayer,
            opacity: comment.id == deletedComment ? colorAnim : 0,
          }}
          pointerEvents="none"
        >
          <Text style={styles.deleteText}>Comment rejected</Text>
        </Animated.View>

        <Animated.View
          style={{
            ...styles.validateLayer,
            opacity: comment.id == validatedComment ? colorAnim : 0,
          }}
          pointerEvents="none"
        >
          <Text style={styles.deleteText}>Comment validated</Text>
        </Animated.View>

      </Animated.View>
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
    // paddingHorizontal: 20,

    borderRadius: 10,
    // height: 500,
    overflow: "hidden",
  },
  commentPoster: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
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
    height: 175,
    backgroundColor: "#ffad4f",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  threadsHeader: {
    fontWeight: "bold",
    color: "#00000044",
    marginHorizontal: 30,
  }, 
  threadsList: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00000077",
    marginHorizontal: 30,
  },
  bookmarkHeader: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#00000044",
    marginHorizontal: 30,
  },
  bookmarkDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00000077",
    marginHorizontal: 30,
  },
  bookmarkUrl: {
    fontSize: 12,
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 20,
    marginHorizontal: 30,
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
  deleteLayer: {
    position: "absolute",
    backgroundColor: "#FF0000",
    width: "100%",
    height: "100%",
    zIndex: 1,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFFCC",
  },
  validateLayer: {
    position: "absolute",
    backgroundColor: "#00FF00",
    width: "100%",
    height: "100%",
    zIndex: 1,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Comment;