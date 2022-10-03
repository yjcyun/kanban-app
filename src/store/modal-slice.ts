import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "@type/data";

const initialState: ModalState = {
  type: "",
  data: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      return { ...state, ...action.payload };
    },
    closeModal: (state) => {
      return {
        ...state,
        type: "",
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
