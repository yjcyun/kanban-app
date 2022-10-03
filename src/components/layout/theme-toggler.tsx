import { ReactComponent as MoonIcon } from "@assets/icon-dark-theme.svg";
import { ReactComponent as SunIcon } from "@assets/icon-light-theme.svg";
import { useTheme } from "@hooks/useTheme";

const ThemeToggler = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <div className="bg-color py-[14px] mx-4 mb-0 mt-4 sm:mx-6 rounded-md sm:mb-2 sm:mt-0">
      <div className="flex items-center justify-center space-x-2">
        <SunIcon />
        <button
          onClick={switchTheme}
          className="w-10 h-5 bg-main-purple hover:bg-main-purple-hover rounded-xl p-[3px]"
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
