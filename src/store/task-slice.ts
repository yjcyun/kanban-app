import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskType } from "@type/data";

export interface TaskState {
  boards: {
    columns: {
      name: string;
      tasks: TaskType[];
    }[];
    name: string;
    id: string;
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
    addTask: (
      state,
      action: PayloadAction<{ currentBoard: string; newTask: TaskType }>
    ) => {
      const { currentBoard, newTask } = action.payload;

      const boardsSnapshot = state.boards;

      const existingBoard = boardsSnapshot.find(
        (board) => board.name === currentBoard
      );

      if (existingBoard) {
        const targetBoardIndex = boardsSnapshot.findIndex(
          (board) => board.name === currentBoard
        );
        const targetColumnIndex = existingBoard.columns.findIndex(
          (column) => column.name === newTask.status
        );

        boardsSnapshot[targetBoardIndex].columns[targetColumnIndex].tasks.push(
          newTask
        );
      }
    },
  },
});

export const { getLocalData, setBoardColumns, addTask } = taskSlice.actions;

export default taskSlice.reducer;
