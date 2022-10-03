import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeState = "dark" | "light";

const initialState: ThemeState = window.matchMedia(
  "(prefers-color-theme: dark)"
).matches
  ? "dark"
  : "light";

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setUserTheme: (_, action: PayloadAction<ThemeState>) => {
      return action.payload;
    },
  },
});

export const { setUserTheme } = themeSlice.actions;

export default themeSlice.reducer;
