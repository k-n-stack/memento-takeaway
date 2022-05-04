import { View, Animated, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableWithoutFeedback, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useEffect, useRef, useState } from "react";
import EditThreads from "../View/EditThreads";
import PinnedThreads from "../View/PinnedThreads";
import MyThreads from "../View/MyThreads";

import { setUserPinnedThreads, setUserThreads, setUserInvalidComment } from "../Store/Features/userSlice";
import { setView } from "../Store/Features/navigationSlice";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ThreadIcon, PinIcon, EditIcon, ArrowLeftIcon, RedirectionsIcon } from "../Component/Svg";
import ThreadBrowser from "../View/ThreadBrowser";

const Interface = (props) => {

  const dispatch = useDispatch();
  const threads = useSelector((state) => (state.user.threads));
  const pinnedThreads = useSelector((state) => (state.user.pinnedThreads));
  const view = useSelector((state) => (state.navigation.view));
  const selectedThread = useSelector((state) => (state.navigation.selectedThread));
  const imageUrl = useSelector((state) => (state.user.image_url));
  const previousView = useSelector((state) => (state.navigation.previousView));

  const translateXAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(setUserThreads());
    dispatch(setUserPinnedThreads());
    dispatch(setUserInvalidComment());
  }, []);

  useEffect(() => {
    // console.log(pinnedThreads);
  })

  const getTitle = (view) => {
    switch (view) {
      case "pinnedThread" :
        return (
          <>
            <View style={styles.titleLogo}>
              <PinIcon color="#3650AB" />
            </View>
            <Text style={styles.title}>Pinned Threads</Text>
          </>
        );
      case "editThread" :
        return (
          <>
            <View style={styles.titleLogo}>
              <EditIcon color="#3650AB" />
            </View>
            <Text style={styles.title}>Edit Threads</Text>
          </>
        );
      case "threadBrowser" :
        return (
          <>
            <Text 
              style={{
                ...styles.title,
                fontSize: 17,
              }}
              numberOfLines={1}
            >
              {Object.keys(selectedThread).length !== 0 ? selectedThread.title : ""}
            </Text>
          </>
        )
      case "myThread" :
      default :
        return (
          <>
            <View style={styles.titleLogo}>
              <ThreadIcon color="#3650AB" />
            </View>
            <Text style={styles.title}>My Threads</Text>
          </>
        );
    }
  }

  const getView = (view) => {
    switch (view) {
      case "pinnedThread" :
        return <PinnedThreads threads={pinnedThreads} />;
      case "editThread" :
        return <EditThreads threads={threads} />;
      case "threadBrowser" :
        return <ThreadBrowser />
      case "myThread" :
      default :
        return <MyThreads threads={threads} />;
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor="white"/>

        <View style={styles.backgroundContainer}>
          <LinearGradient
            colors={['#8299ce', '#694896']}
            start={[0, 1]}
            end={[1, 0]}
            style={styles.background}
          >
          </LinearGradient>
        </View>

        <View style={styles.topBar}>
          <LinearGradient
            colors={['#FFFFFF', '#bc9acc']}
            start={[0, 1]}
            end={[1, 0]}
            style={styles.topBarLinearGradient}
          >
            <View style={styles.titleContainer}>
              {getTitle(view)}
            </View>

          <TouchableWithoutFeedback
            onPress={() => {
              Animated.timing(translateXAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }}
          >
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{ uri : `https://api.stack.mn/api/${imageUrl}` }}
              />
            </View>
          </TouchableWithoutFeedback>

          </LinearGradient>
        </View>
        <View style={styles.content}>
          <ScrollView>
            {getView(view)}
          </ScrollView>
        </View>

        {
          view !== "threadBrowser" &&
          <View style={styles.navbar}>
            <View sytle={styles.iconContainer}>
              <TouchableWithoutFeedback onPress={() => {
                dispatch(setView("pinnedThread"));
              }}>
                <View style={styles.svgContainer}>
                  <PinIcon color={view === "pinnedThread" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.8)"} />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View sytle={styles.iconContainer}>
              <TouchableWithoutFeedback onPress={() => {
                dispatch(setView("myThread"));
              }}>
                <View style={styles.svgContainer}>
                  <ThreadIcon color={view === "myThread" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.8)"} />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View sytle={styles.iconContainer}>
              <TouchableWithoutFeedback onPress={() => {
                dispatch(setView("editThread"));
              }}>
                <View style={styles.svgContainer}>
                  <EditIcon color={view === "editThread" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.8)"} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        }

      </View>

      {
        previousView === "pinnedThread" &&
        <View style={styles.threadOwner}>
          <Image
            style={styles.threadOwnerAvatar}
            source={{ uri : `https://api.stack.mn/api/${selectedThread.user.image_url}` }}
          />
          <Text style={styles.ownerName}>{selectedThread.user.pseudonym}</Text>
        </View>
      }

      <Animated.View 
          style={{
            ...styles.settingsPanel,
            transform: [{
              translateX: translateXAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [320, 0]  // 0 : 150, 0.5 : 75, 1 : 0
              }),
            }],
          }}
        >
          <View style={styles.backgroundContainer}>
            <LinearGradient
              colors={['#3c7bae', '#3650AB', '#3650AB', '#2d0c7a']}
              start={[0, 1]}
              end={[1, 0]}
              style={styles.background}          
            >
            </LinearGradient>
          </View>
          
          <View style={styles.settingsPanelContent}>

            <View style={styles.settingsPanelAvatar}>
              <Image
                style={styles.avatar}
                source={{ uri : `https://api.stack.mn/api/${imageUrl}` }}
              />
            </View>

            <TouchableWithoutFeedback onPress={() => {
              Animated.timing(translateXAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }}>
              <View style={styles.settingsPanelClose}>
                <ArrowLeftIcon color="rgba(255, 255, 255, 0.8)" />
              </View>
            </TouchableWithoutFeedback>

          </View>

        </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  backgroundContainer: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
  },
  topBar: {
    // flex: 1,
    height: 70,

    shadowColor: '#000',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  topBarLinearGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },  
  content: {
    flex: 12,
  },
  navbar: {
    flex: 1,
    backgroundColor: "#3650AB",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  svgContainer: {
    width: 45,
    height: 45,
  },
  avatarContainer: {
    width: 140,
    overflow: "hidden",
    borderBottomLeftRadius: 100,
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3650AB",
    maxWidth: 220,
  },
  titleLogo: {
    width: 35,
    height: 35,
    marginRight: 5,
  },
  settingsPanel: {
    position: "absolute",
    elevation: 10,
    width: 320,
    height: Dimensions.get('window').height,
    right: 0,
  },
  settingsPanelContent: {
    flex: 1,
    position: 'relative',
  },
  settingsPanelAvatar: {
    overflow: "hidden",
    height: 300,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 180,
  },
  settingsPanelClose: {
    position: "absolute",
    elevation: 10,
    left: 10,
    top: 260,
    height: 36,
    width: 36,
    overflow: "visible",
  },
  threadOwner: {
    zIndex: 10,
    position: "absolute",
    // top: 80,
    bottom: 20,
    right: 10,
    alignItems: "flex-end",
    backgroundColor: "#3650AB",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  threadOwnerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  ownerName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});

export default Interface;