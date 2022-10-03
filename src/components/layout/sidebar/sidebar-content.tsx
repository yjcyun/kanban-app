import { ReactComponent as HideIcon } from "@assets/icon-hide-sidebar.svg";
import { useAppSelector } from "@hooks/useStore";
import { useWindowSize } from "@hooks/useWindowSize";
import SidebarItem from "../sidebar-item";
import ThemeToggler from "../theme-toggler";

type SidebarContentProps = {
  onHideSidebar: () => void;
  handleBoardItemClick?: () => void;
};

const SidebarContent = ({
  onHideSidebar,
  handleBoardItemClick,
}: SidebarContentProps) => {
  const { boards } = useAppSelector((state) => state.tasks);
  const { width } = useWindowSize();

  return (
    <>
      <div>
        <h4 className="heading-sm uppercase pl-6 mb-5">
          all boards ({boards.length})
        </h4>
        <ul>
          {boards.map((board, index) => (
            <SidebarItem
              label={board.name}
              type="board"
              key={board.id}
              defaultTab={index === 0}
              handleBoardItemClick={handleBoardItemClick}
            />
          ))}
          <SidebarItem
            label="+ Create New Board"
            highlight
            type="board"
            handleBoardItemClick={handleBoardItemClick}
          />
        </ul>
      </div>
      <ul>
        <ThemeToggler />
        {width! > 640 && (
          <SidebarItem
            label="Hide Sidebar"
            type="button"
            Icon={HideIcon}
            onHideSidebar={onHideSidebar}
          />
        )}
      </ul>
    </>
  );
};

export default SidebarContent;
