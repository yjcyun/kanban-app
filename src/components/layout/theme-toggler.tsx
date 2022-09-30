import { useState, useEffect } from "react";

const ThemeToggler = () => {
  const [theme, setTheme] = useState("");

  const userTheme = localStorage.getItem("user-theme");

  const hasDarkPreference = window.matchMedia(
    "(prefers-color-theme: dark)"
  ).matches;

  const themeSwitch = () => {
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

  return (
    <button onClick={themeSwitch}>{theme === "dark" ? "Light" : "Dark"}</button>
  );
};

export default ThemeToggler;
