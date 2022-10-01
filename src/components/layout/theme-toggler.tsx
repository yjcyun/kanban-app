import { ReactComponent as MoonIcon } from "../../assets/icon-dark-theme.svg";
import { ReactComponent as SunIcon } from "../../assets/icon-light-theme.svg";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggler = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <div className="bg-light-gray py-[14px] mx-6 rounded-md mb-2">
      <div className="flex items-center justify-center space-x-2">
        <SunIcon />
        <button
          onClick={switchTheme}
          className="w-10 h-5 bg-main-purple rounded-xl p-[3px]"
        >
          <div
            className={`w-[14px] h-[14px] rounded-full bg-white transition ${
              theme === "dark" ? "translate-x-5" : ""
            }`}
          ></div>
        </button>
        <MoonIcon />
      </div>
    </div>
  );
};

export default ThemeToggler;
