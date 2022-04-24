import { createSlice } from "@reduxjs/toolkit";
import { fetchGlobalThreadsThunk } from "../Thunks/globalThunks";

export const setGlobalThreads = fetchGlobalThreadsThunk();

export const globalSlice = createSlice({

  name: "global",

  initialState: {
    threads: [],
  },

  extraReducers: {
    [setGlobalThreads.rejected]: (state, action) => {},
    [setGlobalThreads.pending]: (state, action) => {},
    [setGlobalThreads.fulfilled]: (state, action) => {
      state.threads = action.payload;
    },
  }
});

export default globalSlice.reducer;