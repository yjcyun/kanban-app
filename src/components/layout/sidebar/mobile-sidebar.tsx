import { useRef } from "react";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { useAppDispatch } from "@hooks/useStore";
import SidebarContent from "./sidebar-content";

type SidebarProps = {
  showBoards: boolean;
  onShowBoards: (state: boolean) => void;
};

const MobileSidebar = ({ showBoards, onShowBoards }: SidebarProps) => {
  const dispatch = useAppDispatch();

  const closeModal = () => onShowBoards(false);

  const ref = useRef(null);
  useOnClickOutside(ref, () => dispatch(closeModal));

  return (
    <div
      className={`fixed top-16 left-0 w-full h-full z-10 bg-[#000000]/50 justify-center ${
        showBoards ? "flex" : "hidden"
      }`}
      onClick={closeModal}
    >
      <div
        className={`relative bg-secondary-color h-fit top-4 rounded-lg py-4 w-[264px]`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <SidebarContent
          onHideSidebar={closeModal}
          handleBoardItemClick={closeModal}
        />
      </div>
    </div>
  );
};

export default MobileSidebar;
