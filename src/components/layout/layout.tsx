import { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useWindowSize } from "../../hooks/useWindowSize";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { width } = useWindowSize();
  return (
    <div className="">
      <Header />

      <main className="w-full">
        {width! > 640 && <Sidebar />}
        {children}
      </main>
    </div>
  );
};

export default Layout;
