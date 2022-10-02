import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../types/data";

export interface ModalState {
  type: string;
  data?: TaskType | null;
}

const initialState: ModalState = {
  type: "",
  data: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.type = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
