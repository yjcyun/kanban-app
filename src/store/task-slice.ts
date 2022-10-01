import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../types/data";

export interface TaskState {
  boards: {
    columns: {
      name: string;
      tasks: TaskType[];
    }[];
    name: string;
  }[];
}

const initialState: TaskState = {
  boards: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getLocalData: (state, action: PayloadAction<any>) => {
      state.boards = action.payload;
    },
  },
});

export const { getLocalData } = taskSlice.actions;

export default taskSlice.reducer;
