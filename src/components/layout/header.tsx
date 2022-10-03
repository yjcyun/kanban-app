import { ReactComponent as Logo } from "@assets/logo-mobile.svg";
import { ReactComponent as LogoLight } from "@assets/logo-light.svg";
import { ReactComponent as LogoDark } from "@assets/logo-dark.svg";
import { ReactComponent as DownIcon } from "@assets/icon-chevron-down.svg";
import { useWindowSize } from "@hooks/useWindowSize";
import { useTheme } from "@hooks/useTheme";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { openModal } from "@store/modal-slice";
import Button from "@ui/button";
import Dropdown from "@ui/dropdown";

type HeaderProps = {
  showSidebar: boolean;
};

const Header = ({ showSidebar }: HeaderProps) => {
  const { width } = useWindowSize();
  const { theme } = useTheme();
  const { boards } = useAppSelector((state) => state.tasks);
  const boardTab = useAppSelector((state) => state.boardTab);
  const dispatch = useAppDispatch();

  const currentBoardIndex = boards.findIndex(
    (board) => board.name === boardTab
  );

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
      <div className="flex h-full w-full justify-between px-4 sm:pl-6 sm:border-b border-color">
        <div className="flex items-center gap-2">
          <h2 className="heading-lg text-black dark:text-white">
            Platform Launch
          </h2>
          <DownIcon className="sm:hidden" />
        </div>
        <div className="flex items-center gap-3">
          <Button
            buttonType="primary"
            onClick={onAddTask}
            disabled={!hasColumns}
            size="large"
            classNames="heading-md"
          >
            {width! > 640 ? "+Add New Task" : "+"}
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
