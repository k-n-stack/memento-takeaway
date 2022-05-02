import { Provider } from 'react-redux';
import store from "./Store/Store";
import Navigation from './Container/Navigation';
import { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';

export default function App() {

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <Provider store={store}>
      <StatusBar translucent={false} backgroundColor="white"/>
      <Navigation />
    </Provider>
  );
}