import { ReactNode, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar/sidebar";
import { useWindowSize } from "@hooks/useWindowSize";
import Modals from "@components/modals";
import MobileSidebar from "./sidebar/mobile-sidebar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [mobileShowSidebar, setMobileShowSidebar] = useState(false);

  const { width } = useWindowSize();

  const onShowSidebar = (state: boolean) => setShowSidebar(state);

  return (
    <div className="h-screen flex flex-col">
      <Header
        showSidebar={showSidebar}
        showBoards={mobileShowSidebar}
        onShowBoards={() => setMobileShowSidebar(!mobileShowSidebar)}
      />

      <main className="flex w-full h-full overflow-y-auto relative">
        {width! > 640 ? (
          <Sidebar showSidebar={showSidebar} onShowSidebar={onShowSidebar} />
        ) : (
          <MobileSidebar
            showBoards={mobileShowSidebar}
            onShowBoards={setMobileShowSidebar}
          />
        )}
        <div
          className={[
            "flex gap-6 absolute p-6 h-full",
            showSidebar ? "left-[300px] main-width" : "left-0 w-full",
            width! > 640 ? "left-[300px] main-width" : "left-0 w-full",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      </main>
      <Modals />
    </div>
  );
};

export default Layout;
