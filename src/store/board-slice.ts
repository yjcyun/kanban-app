import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BoardState = string;

const initialState: BoardState = "";

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    selectTab: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { selectTab } = boardSlice.actions;

export default boardSlice.reducer;
