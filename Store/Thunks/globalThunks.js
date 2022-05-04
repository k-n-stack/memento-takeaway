import { createAsyncThunk } from "@reduxjs/toolkit";

const handleError = (error) => {
  let _error = { error: "" };
  switch(error.name) {
    case "TypeError" :
      _error.error = "API Error";
      break;
    case "SyntaxError" :
      _error.error = "Not found";
      break;
    default :
      _error.error = "Default Error, check API, Store, Thunks...";
  }
  return _error;
};

const routes = {
  fetchGlobalThreads: "/global-thread-full"
};

const fetchGlobalThreadsThunk = () => createAsyncThunk(
  "users/fetchGlobalThreads",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchGlobalThreads, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem('stmn_token')}`,
        },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export {
  fetchGlobalThreadsThunk
}