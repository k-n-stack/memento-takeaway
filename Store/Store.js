import { configureStore, combineReducers } from "@reduxjs/toolkit";

import navigationReducer from "./Features/navigationSlice";
import userReducer from "./Features/userSlice";
import globalReducer from "./Features/globalSlice";
import newThreadReducer from "./Features/newThreadSlice";

const rootReducer = combineReducers(
  {
    navigation: navigationReducer,
    user: userReducer,
    global: globalReducer,
    newThread: newThreadReducer,
  }
);

const store = configureStore({
  reducer: rootReducer
});

export default store;