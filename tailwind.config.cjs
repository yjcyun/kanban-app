/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#635FC7",
        "light-purple": "#A8A4FF",
        red: "#EA5555",
        "light-red": "#FF9898",
        "light-grey": "#F4F7FD",
        "light-blue-grey": "#E4EBFA",
        "medium-gray": "#828FA3",
        "blue-grey": "#3E3F4E",
        "dark-grey": "#2B2C37",
        "very-dark-grey": "#20212C",
        "almost-black": "#000112",
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
