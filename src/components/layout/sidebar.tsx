import { ReactComponent as HideIcon } from "@assets/icon-hide-sidebar.svg";
import { ReactComponent as ShowIcon } from "@assets/icon-show-sidebar.svg";
import SidebarItem from "@ui/sidebar-item";
import ThemeToggler from "./theme-toggler";
import { useAppSelector } from "@hooks/useStore";

type SidebarProps = {
  showSidebar: boolean;
  onShowSidebar: (state: boolean) => void;
};

const Sidebar = ({ showSidebar, onShowSidebar }: SidebarProps) => {
  const { boards } = useAppSelector((state) => state.tasks);

  return (
    <>
      <aside
        className={`fixed z-10 bg-white dark:bg-dark-gray main-height w-[300px] border-r border-color py-8 flex flex-col justify-between transition ${
          showSidebar ? "" : "-translate-x-full"
        }`}
      >
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
              />
            ))}
            <SidebarItem label="+ Create New Board" highlight type="board" />
          </ul>
        </div>
        <ul>
          <ThemeToggler />
          <SidebarItem
            label="Hide Sidebar"
            type="button"
            Icon={HideIcon}
            onHideSidebar={() => onShowSidebar(false)}
          />
        </ul>
      </aside>

      {!showSidebar && (
        <button
          className="fixed bottom-8 left-0 z-10"
          onClick={() => onShowSidebar(true)}
        >
          <div className="bg-main-purple p-[18px] rounded-r-full">
            <ShowIcon />
          </div>
        </button>
      )}
    </>
  );
};

export default Sidebar;
