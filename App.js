import { Provider } from 'react-redux';
import store from "./Store/Store";
import Navigation from './Container/Navigation';
import { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar translucent={false} backgroundColor="white"/>
      <Navigation />
    </Provider>
  );
}