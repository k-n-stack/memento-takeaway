import { createSlice } from "@reduxjs/toolkit";

export const newThreadSlice = createSlice({

  name: "newThread",

  initialState: {
    color: "#777777",
  },

  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },

});

export const {
  setColor,
} = newThreadSlice.actions;


export default newThreadSlice.reducer;