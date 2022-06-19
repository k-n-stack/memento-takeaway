import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Animated, Button } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { TrashIcon } from "../Component/Svg";
import { ThumbUpIcon } from "../Component/Svg";

import { useDispatch, useSelector } from "react-redux";
import { validateComments, deleteComments } from "../Store/Features/navigationSlice";

import { setPreviousView } from "../Store/Features/navigationSlice";

import Comment from "../Module/Comment";

const EditThreads = () => {
  
  const invalidComments = useSelector((state) => (state.user.invalidComments));

  const getComments = (comments) => {
    return comments.map(function (comment, index) {
      return <Comment comment={comment} key={`comment-${index}`}/>;
    });
  }

  useEffect(() => {
    setPreviousView("editThreads");
  }, []);

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