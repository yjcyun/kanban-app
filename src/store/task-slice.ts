import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnType, TaskType } from "@type/data";
import { addToArray, removeFromArray } from "@utils/util-functions";

export interface TaskState {
  boards: {
    columns: {
      id: string;
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
        stateBoard[targetBoardIndex].columns[newTargetColumnIndex].tasks.splice(
          targetTaskIndex,
          0,
          updatedTask
        );
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        currentBoard: string;
        currentTask: TaskType;
      }>
    ) => {
      const { currentBoard, currentTask } = action.payload;

      const targetBoard = state.boards.find(
        (board) => board.name === currentBoard
      );

      if (targetBoard) {
        // Find the index of the board of the currently selected board
        const targetBoardIndex = state.boards.findIndex(
          (board) => board.name === currentBoard
        );
        // Find the index of the column of the task being deleted
        const targetColumnIndex = targetBoard.columns.findIndex((col) =>
          col.tasks.find((task) => task.id === currentTask.id)
        );
        // Find the index of the task being deleted
        const targetTaskIndex = targetBoard.columns[
          targetColumnIndex
        ].tasks.findIndex((task) => task.id === currentTask.id);
        // Remove targetted task
        state.boards[targetBoardIndex].columns[targetColumnIndex].tasks.splice(
          targetTaskIndex,
          1
        );
      }
    },
    addBoard: (
      state,
      action: PayloadAction<{ currentBoard: string; newBoard: any }>
    ) => {
      const { currentBoard, newBoard } = action.payload;

      if (
        currentBoard.toLocaleLowerCase() !== newBoard.name.toLocaleLowerCase()
      ) {
        state.boards.push(newBoard);
      }
    },
    updateBoard: (
      state,
      action: PayloadAction<{ currentBoard: string; updatedBoard: any }>
    ) => {
      const { currentBoard, updatedBoard } = action.payload;

      // For which board is it updating?
      const targetBoard = state.boards.find(
        (board) => board.name === currentBoard
      );

      if (targetBoard) {
        // Find the index of the board that's being updated
        const targetBoardIndex = state.boards.findIndex(
          (board) => board.name === currentBoard
        );

        const updatedBoardColumns = {
          ...updatedBoard,
          columns: updatedBoard.columns.map((col: ColumnType) => {
            return {
              ...col,
              tasks: col?.tasks?.map((task: TaskType) => {
                return {
                  ...task,
                  status: col.name,
                };
              }),
            };
          }),
        };

        state.boards[targetBoardIndex] = updatedBoardColumns;
      }
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      const currentBoard = action.payload;

      const targetBoard = state.boards.find(
        (board) => board.name === currentBoard
      );

      if (targetBoard) {
        const targetBoardIndex = state.boards.findIndex(
          (board) => board.name === currentBoard
        );
        const [, result] = removeFromArray(state.boards, targetBoardIndex);
        state.boards = result;
      }
    },
    dragEndTask: (state, action: PayloadAction<any>) => {
      const { currentBoardIndex, destination, source } = action.payload;
      const sourceColumnIndex = state.boards[
        currentBoardIndex
      ]?.columns.findIndex((column) => column.id === source.droppableId);

      const destinationColumnIndex = state.boards[
        currentBoardIndex
      ]?.columns.findIndex((column) => column.id === destination.droppableId);

      // 1. Make a copy of all the columns [{name:"Todo"...}, {name:"Doing",,,},....]
      const columnsCopy = [...state.boards[currentBoardIndex]?.columns];

      // 2. Get the array of all tasks from the source column
      const sourceTasks = columnsCopy[sourceColumnIndex].tasks;

      // 3. Remove the selected item from the array(step 2)
      const [removedItem, newTasksList] = removeFromArray<TaskType>(
        sourceTasks!,
        source.index
      );

      // 4. Replace the entire column tasks array with the new array of tasks created from step3
      columnsCopy[sourceColumnIndex].tasks = newTasksList;

      // 5. Get the tasks array of destination
      const destinationTasks = columnsCopy[destinationColumnIndex].tasks;
      removedItem.status = columnsCopy[destinationColumnIndex].name;

      // 6. Replace array from step 5 with the array with replaced task
      columnsCopy[destinationColumnIndex].tasks = addToArray(
        destinationTasks,
        destination.index,
        removedItem
      );

      state.boards[currentBoardIndex] = {
        ...state.boards[currentBoardIndex],
        columns: columnsCopy,
      };
    },
  },
});

export const {
  getLocalData,
  setBoardColumns,
  addTask,
  updateTask,
  deleteTask,
  addBoard,
  updateBoard,
  deleteBoard,
  dragEndTask,
} = taskSlice.actions;

export default taskSlice.reducer;
