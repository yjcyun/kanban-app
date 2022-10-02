import { useState, useRef } from "react";
import { ReactComponent as Logo } from "@assets/logo-mobile.svg";
import { ReactComponent as LogoLight } from "@assets/logo-light.svg";
import { ReactComponent as LogoDark } from "@assets/logo-dark.svg";
import { ReactComponent as DownIcon } from "@assets/icon-chevron-down.svg";
import { ReactComponent as VerticalIcon } from "@assets/icon-vertical-ellipsis.svg";
import { useWindowSize } from "@hooks/useWindowSize";
import { useTheme } from "@hooks/useTheme";
import { useAppDispatch } from "@hooks/useStore";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { openModal } from "@store/modal-slice";
import Button from "@ui/button";

const Header = () => {
  const { width } = useWindowSize();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [dropMore, setDropMore] = useState(false);

  // Close view more dropbox
  const ref = useRef(null);
  useOnClickOutside(ref, () => setDropMore(false));

  const onAddTask = () => {
    dispatch(openModal({ type: "add-task" }));
  };

  const onEditBoard = () => {
    dispatch(openModal({ type: "edit-board" }));
  };

  const onDeleteBoard = () => {
    dispatch(openModal({ type: "delete-board" }));
  };

  return (
    <header className="flex items-center bg-white dark:bg-dark-gray h-16 sm:h-20 lg:h-24 pr-4 w-full">
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
          <button
            className="relative group"
            onClick={() => setDropMore(!dropMore)}
            ref={ref}
          >
            <VerticalIcon className="group-hover:fill-main-purple" />
            <div
              className={`absolute w-[192px] mt-9 right-0 shadow-dropbox rounded-lg p-4 bg-white body-lg text-left space-y-4 z-20 ${
                dropMore ? "block" : "hidden"
              }`}
            >
              <p onClick={onEditBoard}>Edit Board</p>
              <p className="text-red" onClick={onDeleteBoard}>
                Delete Board
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
