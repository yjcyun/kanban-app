import { useState } from "react";
import SidebarItem from "../ui/sidebar-item";
import ThemeToggler from "./theme-toggler";
import { ReactComponent as HideIcon } from "../../assets/icon-hide-sidebar.svg";
import { ReactComponent as ShowIcon } from "../../assets/icon-show-sidebar.svg";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <aside
        className={`bg-white dark:bg-dark-gray main-height w-[300px] border-r border-color py-8 flex flex-col justify-between transition ${
          showSidebar ? "" : "-translate-x-full"
        }`}
      >
        <div>
          <h4 className="heading-sm uppercase pl-6 mb-5">all boards (3)</h4>
          <ul>
            <SidebarItem
              to="/platform-launch"
              label="Platform Launch"
              type="link"
            />
            <SidebarItem
              to="/marketing-plan"
              label="Marketing Plan"
              type="link"
            />
            <SidebarItem
              to="/new-board"
              label="+ Create New Board"
              highlight
              type="link"
            />
          </ul>
        </div>
        <ul>
          <ThemeToggler />
          <SidebarItem
            label="Hide Sidebar"
            type="button"
            Icon={HideIcon}
            onClick={() => setShowSidebar(false)}
          />
        </ul>
      </aside>

      <button
        className="absolute bottom-8 left-0"
        onClick={() => setShowSidebar(true)}
      >
        <div className="bg-main-purple p-[18px] rounded-r-full">
          <ShowIcon />
        </div>
      </button>
    </>
  );
};

export default Sidebar;
