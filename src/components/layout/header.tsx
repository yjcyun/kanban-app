import { ReactComponent as Logo } from "../../assets/logo-mobile.svg";
import { ReactComponent as LogoLight } from "../../assets/logo-light.svg";
import { ReactComponent as LogoDark } from "../../assets/logo-dark.svg";
import { ReactComponent as DownIcon } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as VerticalIcon } from "../../assets/icon-vertical-ellipsis.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import Button from "../ui/button";
import { useTheme } from "../../hooks/useTheme";
import { openModal } from "../../store/modal-slice";
import { useAppDispatch } from "../../hooks/useStore";

const Header = () => {
  const { width } = useWindowSize();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const onAddTask = () => {
    dispatch(openModal({ type: "add-task" }));
  };
  return (
    <header className="flex items-center bg-white dark:bg-dark-gray h-16 pr-4 w-full">
      <div className="sm:border-r border-light-lines dark:border-dark-lines h-full flex items-center sm:pr-6 pl-4 sm:w-[300px] shrink-0">
        {width! > 640 ? (
          theme === "dark" ? (
            <LogoLight />
          ) : (
            <LogoDark />
          )
        ) : (
          <Logo />
        )}
      </div>
      <div className="flex h-full w-full justify-between pl-4 sm:pl-6">
        <div className="flex items-center gap-2">
          <h2 className="heading-lg text-black dark:text-white">
            Platform Launch
          </h2>
          <DownIcon className="sm:hidden" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 sm:w-[164px]">
            <Button buttonType="primary" onClick={onAddTask}>
              {width! > 640 ? "+Add New Task" : "+"}
            </Button>
          </div>
          <VerticalIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
