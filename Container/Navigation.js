import { View } from "react-native";

import Login from "../View/Login";
import Interface from "./Interface";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from 'react';

import { BackHandler, Alert } from 'react-native';

import { setPreviousView, setView } from "../Store/Features/navigationSlice";

const Navigation = () => {

  const dispatch = useDispatch();
  const previousView = useSelector((state) => (state.navigation.previousView));
  const view = useSelector((state) => (state.navigation.view));
  const isLogin = useSelector((state) => (state.navigation.isLogin));

  const getView = (view, isLogin) => {

    switch (true) {
      case view === "login" :
        return <Login />;
      case isLogin :
        return <Interface />;
      default:
        return <Login />
    }
  }

  useEffect(() => {

    const backAction = () => {

      if (previousView != "") {
        dispatch(setView(previousView));
        dispatch(setPreviousView(""));
        return true;
      } 

      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;

    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, /*[]*/);

  return getView(view, isLogin);
}

export default Navigation;