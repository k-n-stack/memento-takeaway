import { View } from "react-native";

import Login from "../Component/Views/Login";
import Interface from "../Component/Views/Interface";

import { useSelector } from "react-redux";

const Navigation = () => {

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

  return getView(view, isLogin);
}

export default Navigation;