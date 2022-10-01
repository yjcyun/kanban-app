import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("");

  const userTheme = localStorage.getItem("user-theme");

  const hasDarkPreference = window.matchMedia(
    "(prefers-color-theme: dark)"
  ).matches;

  const switchTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  };

  useEffect(() => {
    if (userTheme === "dark" || (!userTheme && hasDarkPreference)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, [userTheme, hasDarkPreference]);

  return { theme, switchTheme };
};
