import { setUserTheme } from "@store/theme-slice";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./useStore";

export const useTheme = () => {
  const [theme, setTheme] = useState("");
  const dispatch = useAppDispatch();

  const userTheme = localStorage.getItem("theme");

  const hasDarkPreference = window.matchMedia(
    "(prefers-color-theme: dark)"
  ).matches;

  const switchTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
      dispatch(setUserTheme("light"));
      return;
    }
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
    dispatch(setUserTheme("dark"));
  };

  useEffect(() => {
    if (userTheme === "dark" || (!userTheme && hasDarkPreference)) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setTheme("dark");
      dispatch(setUserTheme("dark"));
    } else {
      document.documentElement.classList.add("light");
      dispatch(setUserTheme("light"));
    }
  }, [userTheme, hasDarkPreference, dispatch]);

  return { theme, switchTheme };
};
