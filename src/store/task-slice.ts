import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "@type/data";

export interface TaskState {
  boards: {
    columns: {
      name: string;
      tasks: TaskType[];
    }[];
    name: string;
  }[];
  boardColumns: string[];
}

const initialState: TaskState = {
  boards: [],
  boardColumns: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getLocalData: (state, action: PayloadAction<any>) => {
      state.boards = action.payload;
    },
    setBoardColumns: (state, action: PayloadAction<string>) => {
      const selectedBoardTab = action.payload;
      const selectedBoard = state.boards.find(
        (item) => item.name === selectedBoardTab
      );

      const selectedBoardColumns = selectedBoard!.columns.map(
        (col) => col.name
      );

      state.boardColumns = selectedBoardColumns;
    },
    editTask: (state, action) => {},
  },
});

export const { getLocalData, setBoardColumns } = taskSlice.actions;

export default taskSlice.reducer;
