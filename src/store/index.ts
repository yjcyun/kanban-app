import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import taskReducer from "./task-slice";
import modalReducer from "./modal-slice";
import boardReducer from "./board-slice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    modal: modalReducer,
    boardTab: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
