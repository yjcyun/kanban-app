import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("");

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
      return;
    }
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  };

  useEffect(() => {
    if (userTheme === "dark" || (!userTheme && hasDarkPreference)) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setTheme("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [userTheme, hasDarkPreference]);

  return { theme, switchTheme };
};
