import { ReactComponent as ShowIcon } from "@assets/icon-show-sidebar.svg";
import SidebarContent from "./sidebar-content";

type SidebarProps = {
  showSidebar: boolean;
  onShowSidebar: (state: boolean) => void;
};

const Sidebar = ({ showSidebar, onShowSidebar }: SidebarProps) => {
  return (
    <>
      <aside
        className={`fixed z-10 bg-white dark:bg-dark-gray main-height w-[300px] border-r border-color py-8 flex flex-col justify-between transition ${
          showSidebar ? "" : "-translate-x-full"
        }`}
      >
        <SidebarContent onHideSidebar={() => onShowSidebar(false)} />
      </aside>

      {!showSidebar && (
        <button
          className="fixed bottom-8 left-0 z-10"
          onClick={() => onShowSidebar(true)}
        >
          <div className="bg-main-purple hover:bg-main-purple-hover p-[18px] rounded-r-full">
            <ShowIcon />
          </div>
        </button>
      )}
    </>
  );
};

export default Sidebar;
