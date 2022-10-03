import { useState } from "react";
import { ReactComponent as Logo } from "@assets/logo-mobile.svg";
import { ReactComponent as LogoLight } from "@assets/logo-light.svg";
import { ReactComponent as LogoDark } from "@assets/logo-dark.svg";
import { ReactComponent as DownIcon } from "@assets/icon-chevron-down.svg";
import { ReactComponent as PlusIcon } from "@assets/icon-add-task-mobile.svg";
import { useWindowSize } from "@hooks/useWindowSize";
import { useTheme } from "@hooks/useTheme";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { openModal } from "@store/modal-slice";
import Button from "@ui/button";
import Dropdown from "@ui/dropdown";

type HeaderProps = {
  showSidebar: boolean;
  showBoards: boolean;
  onShowBoards: () => void;
};

const Header = ({ showSidebar, showBoards, onShowBoards }: HeaderProps) => {
  const { width } = useWindowSize();
  const { boards } = useAppSelector((state) => state.tasks);
  const theme = useAppSelector((state) => state.theme);
  const boardTab = useAppSelector((state) => state.boardTab);
  const dispatch = useAppDispatch();

  const currentBoardIndex = boards.findIndex(
    (board) => board.name === boardTab
  );

  const themeLogo = theme === "dark" ? <LogoLight /> : <LogoDark />;

  const hasColumns = boards[currentBoardIndex].columns.length > 0;

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
    <header className="flex items-center bg-white dark:bg-dark-gray h-16 sm:h-20 lg:h-24 w-full flex-shrink-0">
      <div
        className={`sm:border-r  border-color h-full flex items-center sm:pr-6 pl-4 shrink-0 ${
          showSidebar ? "sm:w-[300px]" : "sm:border-b sm:w-[210px]"
        }`}
      >
        {width! > 640 ? themeLogo : <Logo />}
      </div>
      <div className="flex h-full w-full justify-between px-4 sm:pl-6 sm:border-b border-color">
        <div
          className="flex items-center gap-2"
          role={width! > 640 ? "" : "button"}
          onClick={onShowBoards}
        >
          <h2 className="heading-lg text-black dark:text-white">
            Platform Launch
          </h2>
          <DownIcon
            className={`sm:hidden transition duration-150 ${
              showBoards ? "-rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`flex items-center ${width! > 640 ? "gap-3" : "gap-1"}`}
        >
          <Button
            buttonType="primary"
            onClick={onAddTask}
            disabled={!hasColumns}
            size={width! > 640 ? "large" : "small"}
            classNames={width! > 640 ? "heading-md" : "px-[18px]"}
          >
            {width! > 640 ? "+ Add New Task" : <PlusIcon />}
          </Button>
          <Dropdown
            text="Board"
            direction="right"
            onEdit={onEditBoard}
            onDelete={onDeleteBoard}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
