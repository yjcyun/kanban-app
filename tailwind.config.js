/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "rgb(var(--color-black) / <alpha-value>)",
        "very-dark-gray": "rgb(var(--color-very-dark-gray) / <alpha-value>)",
        "dark-gray": "rgb(var(--color-dark-gray) / <alpha-value>)",
        "dark-lines": "rgb(var(--color-dark-lines) / <alpha-value>)",
        "medium-gray": "rgb(var(--color-medium-gray) / <alpha-value>)",
        "light-lines": "rgb(var(--color-light-lines) / <alpha-value>)",
        "light-gray": "rgb(var(--color-light-gray) / <alpha-value>)",
        "main-purple": "rgb(var(--color-main-purple) / <alpha-value>)",
        "main-purple-hover":
          "rgb(var(--color-main-purple-hover) / <alpha-value>)",
        red: "rgb(var(--color-red) / <alpha-value>)",
        "red-hover": "rgb(var(--color-red-hover) / <alpha-value>)",
      },
      fontSize: {
        "heading-xl": ["24px", "30px"],
        "heading-lg": ["18px", "23px"],
        "heading-md": ["15px", "19px"],
        "heading-sm": ["12px", { lineHeight: "15px", letterSpacing: "2.4px" }],
        "body-lg": ["13px", "23px"],
        "body-md": ["12px", "15px"],
      },
      boxShadow: {
        card: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
      },
    },
  },
  plugins: [],
};
