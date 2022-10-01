import { ReactNode, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useWindowSize } from "../../hooks/useWindowSize";
import Modal from "../ui/modal";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { width } = useWindowSize();

  const onShowSidebar = (state: boolean) => setShowSidebar(state);

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex w-full h-full overflow-y-auto relative">
        {width! > 640 && (
          <Sidebar showSidebar={showSidebar} onShowSidebar={onShowSidebar} />
        )}
        <div
          className={[
            "flex gap-6 absolute p-6 min-w-full h-full",
            showSidebar ? "left-[300px]" : "left-0",
            width! > 640 ? "left-[300px]" : "left-0",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      </main>
      <Modal>hello</Modal>
    </div>
  );
};

export default Layout;
