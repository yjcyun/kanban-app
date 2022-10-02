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

      const stateBoard = state.boards;

      const existingBoard = stateBoard.find(
        (board) => board.name === currentBoard
      );

      if (existingBoard) {
        const targetBoardIndex = stateBoard.findIndex(
          (board) => board.name === currentBoard
        );
        const targetColumnIndex = existingBoard.columns.findIndex(
          (column) => column.name === newTask.status
        );

        stateBoard[targetBoardIndex].columns[targetColumnIndex].tasks.push(
          newTask
        );
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{
        currentBoard: string;
        updatedTask: TaskType;
        prevTask: TaskType;
      }>
    ) => {
      const { currentBoard, prevTask, updatedTask } = action.payload;

      const stateBoard = state.boards;

      // For which board is it updating?
      const targetBoard = stateBoard.find(
        (board) => board.name === currentBoard
      );

      // Find the index of the board that's being updated
      const targetBoardIndex = stateBoard.findIndex(
        (board) => board.name === currentBoard
      );

      if (targetBoard) {
        // Find the index of the column that's being updated
        const prevTargetColumnIndex = targetBoard.columns.findIndex((column) =>
          column.tasks?.find((task) => task.id === prevTask.id)
        );

        // Find the index of the column that's being updated
        const newTargetColumnIndex = targetBoard.columns.findIndex(
          (column) => column.name === updatedTask.status
        );

        // Find the index of the task that's being updated
        const targetTaskIndex = targetBoard.columns[
          prevTargetColumnIndex
        ].tasks.findIndex((task) => task.id === prevTask.id);

        // Remove the old task
        stateBoard[targetBoardIndex].columns[
          prevTargetColumnIndex
        ].tasks.splice(targetTaskIndex, 1);

        // Add an updated task
        stateBoard[targetBoardIndex].columns[newTargetColumnIndex].tasks.push(
          updatedTask
        );
      }
    },
  },
});

export const { getLocalData, setBoardColumns, addTask, updateTask } =
  taskSlice.actions;

export default taskSlice.reducer;
