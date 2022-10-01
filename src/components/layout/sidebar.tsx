import SidebarItem from "../ui/sidebar-item";
import ThemeToggler from "./theme-toggler";
import { ReactComponent as HideIcon } from "../../assets/icon-hide-sidebar.svg";

const Sidebar = () => {
  return (
    <aside className="bg-white main-height w-[300px] border-r border-light-lines py-8 flex flex-col justify-between">
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
          onClick={() => console.log("hide!")}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
